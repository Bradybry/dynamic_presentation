export const THEME = {
    colors: {
      madison: '#ff9999',  // Peach/Pink for Madison
      bryce: '#daa520',    // Gold for Bryce
      accent: '#ffc0cb',   // Light pink accent
      primary: '#ff9999',  // Primary color (pink)
      secondary: '#daa520', // Secondary color (gold)
      chart: {
        madison: {
          primary: '#ff9999',
          secondary: '#ffb399',
        },
        bryce: {
          primary: '#daa520',
          secondary: '#ffd700',
        }
      }
    },
    buttons: {
      primary: 'bg-rose-400 hover:bg-rose-500 text-white',
      secondary: 'bg-amber-500 hover:bg-amber-600 text-white'
    }
  };
  
  // Create reusable gradient definitions for charts
  export const createGradient = (color: string, id: string) => `
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="${color}" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="${color}" stopOpacity={0.2}/>
      </linearGradient>
    </defs>
  `;