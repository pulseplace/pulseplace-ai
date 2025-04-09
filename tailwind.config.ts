
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['"Neue Haas Grotesk Display Pro"', 'Inter', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
			},
			letterSpacing: {
				wider: '0.05em',
				widest: '0.1em',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					light: '#F7F9FB', // Soft Cloud (corrected from F799FB to F7F9FB based on typical cloud color)
					dark: '#121417', // Midnight Fog
				},
				foreground: 'hsl(var(--foreground))',
				
				// Updated Brand colors with exact hex codes from the image
				primary: {
					DEFAULT: '#1A1A2E', // Soulful Midnight
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#3F8CFF', // Pulse Blue
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#FF566B', // Ember Coral
					foreground: '#FFFFFF',
				},
				success: {
					DEFAULT: '#32D27E', // Trust Mint
					foreground: '#FFFFFF',
				},
				text: {
					primary: '#202020', // Charcoal Ink
					muted: '#8A888A', // Grey Mist
				},
				
				// Additional named colors for direct access
				"soulful-midnight": "#1A1A2E",
				"pulse-blue": "#3F8CFF",
				"ember-coral": "#FF566B",
				"soft-cloud": "#F7F9FB", // Corrected from F799FB
				"midnight-fog": "#121417",
				"charcoal-ink": "#202020",
				"grey-mist": "#8A888A",
				"trust-mint": "#32D27E",
				
				// Legacy PulsePlace colors kept for backwards compatibility
				pulse: {
					50: '#f5f7ff',
					100: '#ecf0ff',
					200: '#d9e2ff',
					300: '#b8c9ff',
					400: '#8e9dff',
					500: '#6366f1',
					600: '#4f46e5',
					700: '#4338ca',
					800: '#3730a3',
					900: '#312e81',
				},
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
				},
				
				// ShadCN colors that need to be maintained
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse': 'pulse 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 10s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'pulse-gradient': 'linear-gradient(135deg, #3F8CFF 0%, #1A1A2E 100%)',
				'teal-gradient': 'linear-gradient(135deg, #32D27E 0%, #1A1A2E 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
