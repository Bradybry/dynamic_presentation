import pandas as pd
import xml.etree.ElementTree as ET
from datetime import datetime
import pytz
import json
import emoji
import numpy as np
from collections import Counter
import re

def load_message_data(file_path):
    """Load and parse both SMS and MMS data from XML file into a pandas DataFrame."""
    tree = ET.parse(file_path)
    root = tree.getroot()
    
    messages = []
    
    # Process SMS messages
    for sms in root.findall('.//sms'):
        message = {
            'date': int(sms.get('date', 0)),
            'type': int(sms.get('type', 0)),
            'body': sms.get('body', ''),
            'contact_name': sms.get('contact_name', ''),
            'readable_date': sms.get('readable_date', ''),
            'message_type': 'SMS'
        }
        messages.append(message)
    
    # Process MMS messages
    for mms in root.findall('.//mms'):
        text = ""
        for part in mms.findall('.//part'):
            if part.get('ct') == 'text/plain':
                text = part.get('text', '')
                break
                
        message = {
            'date': int(mms.get('date', 0)),
            'type': int(mms.get('m_type', 0)),
            'body': text,
            'contact_name': mms.get('contact_name', ''),
            'readable_date': mms.get('readable_date', ''),
            'message_type': 'MMS'
        }
        messages.append(message)
    
    df = pd.DataFrame(messages)
    
    if not df.empty:
        df['datetime'] = pd.to_datetime(df['readable_date'], format='%b %d, %Y %I:%M:%S %p')
        houston_tz = pytz.timezone('America/Chicago')
        df['datetime'] = df['datetime'].dt.tz_localize(houston_tz)
        
        df['sender'] = df.apply(lambda row: 
            'Madison' if (row['message_type'] == 'SMS' and row['type'] == 1) or 
                        (row['message_type'] == 'MMS' and row['type'] == 132)
            else 'Bryce', axis=1)
    
    return df.sort_values('date')

def calculate_basic_stats(df):
    """Calculate basic message statistics."""
    total_messages = int(len(df))
    total_days = int((df['datetime'].max() - df['datetime'].min()).days + 1)
    
    message_counts = df['sender'].value_counts()
    partner_messages = int(message_counts.get('Madison', 0))
    user_messages = int(message_counts.get('Bryce', 0))
    
    return {
        "totalMessages": total_messages,
        "totalDays": total_days,
        "partnerName": "Madison",
        "userName": "Bryce",
        "messageStats": {
            "partnerMessages": partner_messages,
            "userMessages": user_messages,
            "partnerPercentage": round((partner_messages / total_messages) * 100, 1),
            "userPercentage": round((user_messages / total_messages) * 100, 1)
        }
    }

def analyze_conversation_initiation(df):
    """Analyze conversation initiations."""
    df_sorted = df.sort_values('datetime')
    df_sorted['time_since_last'] = df_sorted['datetime'].diff()
    conversation_starts = df_sorted[df_sorted['time_since_last'] > pd.Timedelta(hours=1)]
    
    initiator_counts = conversation_starts['sender'].value_counts()
    total_initiations = len(conversation_starts)
    
    return {
        "conversationStats": {
            "partnerInitiated": round((initiator_counts.get('Madison', 0) / total_initiations) * 100, 1),
            "userInitiated": round((initiator_counts.get('Bryce', 0) / total_initiations) * 100, 1)
        }
    }

def analyze_word_stats(df):
    """Analyze word statistics."""
    df['word_count'] = df['body'].str.split().str.len()
    total_words = int(df['word_count'].sum())
    
    return {
        "wordStats": {
            "totalWords": total_words,
            "comparisonBook": {
                "name": "Animal Farm",
                "wordCount": 29060
            }
        }
    }

def analyze_message_lengths(df):
    """Analyze message length statistics."""
    df['word_count'] = df['body'].str.split().str.len()
    df['char_count'] = df['body'].str.len()
    
    partner_stats = df[df['sender'] == 'Madison'].agg({
        'word_count': 'mean',
        'char_count': 'mean'
    })
    
    user_stats = df[df['sender'] == 'Bryce'].agg({
        'word_count': 'mean',
        'char_count': 'mean'
    })
    
    return {
        "messageLengthStats": {
            "partner": {
                "wordsPerMessage": round(partner_stats['word_count'], 2),
                "charactersPerMessage": round(partner_stats['char_count'], 2)
            },
            "user": {
                "wordsPerMessage": round(user_stats['word_count'], 2),
                "charactersPerMessage": round(user_stats['char_count'], 2)
            }
        }
    }

def analyze_response_times(df):
    """Analyze response time patterns."""
    def calculate_response_distribution(times_minutes):
        bins = [0, 1, 2, 5, 15, 30, float('inf')]
        labels = ['0-1m', '1-2m', '2-5m', '5-15m', '15-30m', '30m+']
        hist, _ = np.histogram(times_minutes, bins=bins)
        # Convert numpy.int64 to regular Python int
        hist = [int(x) for x in hist]
        return dict(zip(labels, hist))
    
    df_sorted = df.sort_values('datetime').copy()
    df_sorted['time_since_last'] = df_sorted['datetime'].diff()
    df_sorted['prev_sender'] = df_sorted['sender'].shift(1)
    
    response_times = {sender: [] for sender in ['Madison', 'Bryce']}
    
    for _, row in df_sorted.iterrows():
        if pd.notnull(row['time_since_last']) and row['sender'] != row['prev_sender']:
            minutes = row['time_since_last'].total_seconds() / 60
            if minutes <= 480:  # 8 hours max
                response_times[row['sender']].append(minutes)
    
    madison_dist = calculate_response_distribution(response_times['Madison'])
    bryce_dist = calculate_response_distribution(response_times['Bryce'])
    
    response_time_data = [
        {"time": time_range, "Madison": madison_dist[time_range], "Bryce": bryce_dist[time_range]}
        for time_range in madison_dist.keys()
    ]
    
    return {
        "responseTimeData": response_time_data,
        "responseTimeStats": {
            "partnerMedianResponse": round(np.median(response_times['Madison']), 1),
            "userMedianResponse": round(np.median(response_times['Bryce']), 1)
        }
    }

def analyze_message_content(df):
    """Analyze message content patterns."""
    def calculate_stats(messages):
        total = int(len(messages))
        emoji_count = int(sum(emoji.emoji_count(str(msg)) > 0 for msg in messages))
        question_count = int(sum('?' in str(msg) for msg in messages))
        exclamation_count = int(sum('!' in str(msg) for msg in messages))
        
        all_emojis = []
        for msg in messages:
            all_emojis.extend([c for c in str(msg) if c in emoji.EMOJI_DATA])
        emoji_counter = Counter(all_emojis)
        top_emojis = emoji_counter.most_common(5)
        most_used = top_emojis[0] if top_emojis else ('', 0)
        
        # Calculate total emoji count
        total_emoji_count = sum(count for _, count in emoji_counter.items())
        
        return {
            "emojiPercentage": round(emoji_count / total, 2),
            "questionPercentage": round(question_count / total, 2),
            "exclamationPercentage": round(exclamation_count / total, 2),
            "mostUsedEmoji": most_used[0],
            "mostUsedEmojiCount": most_used[1],
            "totalEmojiCount": total_emoji_count,
            "topEmojis": [{"emoji": emoji, "count": count} for emoji, count in top_emojis]
        }
    
    partner_messages = df[df['sender'] == 'Madison']['body']
    user_messages = df[df['sender'] == 'Bryce']['body']
    
    partner_stats = calculate_stats(partner_messages)
    user_stats = calculate_stats(user_messages)
    
    return {
        "messageContentStats": {
            "partner": partner_stats,
            "user": user_stats
        }
    }

def generate_dating_stats(xml_path, output_path):
    """Generate complete dating statistics and save to JSON file."""
    # Load and process data
    df = load_message_data(xml_path)
    
    # Generate all statistics
    stats = {}
    stats.update(calculate_basic_stats(df))
    stats.update(analyze_conversation_initiation(df))
    stats.update(analyze_word_stats(df))
    stats.update(analyze_message_lengths(df))
    stats.update(analyze_response_times(df))
    stats.update(analyze_message_content(df))
    
    # Convert any remaining numpy types to native Python types
    def convert_to_native(obj):
        if isinstance(obj, (np.int64, np.int32)):
            return int(obj)
        elif isinstance(obj, (np.float64, np.float32)):
            return float(obj)
        elif isinstance(obj, dict):
            return {key: convert_to_native(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            return [convert_to_native(item) for item in obj]
        return obj
    
    stats = convert_to_native(stats)
    
    # Save to JSON file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
    
    return stats

if __name__ == "__main__":
    # Example usage
    stats = generate_dating_stats('./stats/sms.xml', './stats/dating_stats.json')
    print("Statistics generated successfully!")
    print("\nSample statistics:")
    print(f"Total Messages: {stats['totalMessages']}")
    print(f"Total Days: {stats['totalDays']}")
    print(f"Partner Messages: {stats['messageStats']['partnerMessages']}")
    print(f"User Messages: {stats['messageStats']['userMessages']}")