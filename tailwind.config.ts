
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
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
				},
				// Palette de couleurs pour le jeu
				game: {
					'primary': '#4F46E5',
					'primary-light': '#818CF8',
					'secondary': '#10B981',
					'secondary-light': '#6EE7B7',
					'accent': '#F97316',
					'accent-light': '#FDBA74',
					'background': '#F8FAFC',
					'surface': '#FFFFFF',
					'error': '#EF4444',
					'success': '#22C55E',
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
				'bounce-slight': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'scale-up': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'cat-move-down': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(100px)'
					}
				},
				'cat-move-up': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(-50px)'
					}
				},
				'tree-sway': {
					'0%, 100%': {
						transform: 'rotate(-1deg)'
					},
					'50%': {
						transform: 'rotate(1deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-up': 'scale-up 0.4s ease-out',
				'cat-move-down': 'cat-move-down 1s ease-out forwards',
				'cat-move-up': 'cat-move-up 1s ease-out forwards',
				'tree-sway': 'tree-sway 5s ease-in-out infinite'
			},
			fontFamily: {
				'rounded': ['var(--font-rounded)', 'system-ui', 'sans-serif'],
				'display': ['var(--font-display)', 'Georgia', 'serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
