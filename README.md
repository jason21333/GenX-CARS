# GenX-CARS

An interactive car showcase web application featuring 360° 3D model viewing, image carousels, and dynamic pricing calculators. Built with Next.js, Three.js, and modern web technologies.

## 🚗 Features

- **360° Interactive 3D View**: Explore cars in immersive 3D using Three.js with GLB model support
- **Image Carousel**: Beautiful image gallery showcasing multiple angles of vehicles
- **Price Calculator**: Dynamic event pricing calculator with customizable invites and duration
- **Car Overview**: Detailed specifications and performance metrics
- **Modern UI**: Sleek, responsive design with Tailwind CSS
- **Docker Support**: Containerized deployment ready
- **Vercel Ready**: Optimized for one-click deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React 18)
- **3D Rendering**: [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 20+ (or use Docker)
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jason21333/GenX-CARS.git
   cd GenX-CARS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Vercel Deployment (Recommended)

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and import your repository
   - Vercel will automatically detect Next.js and configure the project

2. **Deploy**
   - Click "Deploy" - Vercel will build and deploy automatically
   - Your site will be live at `https://your-project.vercel.app`

3. **Automatic deployments**
   - Every push to `main` branch will trigger a new deployment
   - Preview deployments are created for pull requests

**Note**: The project includes `vercel.json` with optimized caching for 3D models and images.

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build and run with Docker**
   ```bash
   docker build -t genxcars .
   docker run -p 3000:3000 genxcars
   ```

## 📁 Project Structure

```
GenX-CARS/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── BugattiViewer.tsx  # 3D model viewer (Three.js)
│   ├── Carousel.tsx       # Image carousel component
│   ├── Overview.tsx       # Car specifications display
│   ├── PriceCalculator.tsx # Pricing calculator
│   └── ThreeSixtyModal.tsx # 360° view modal
├── public/
│   ├── images/            # Car images
│   └── models/            # 3D model files (.glb)
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── vercel.json            # Vercel deployment configuration
└── package.json          # Dependencies and scripts
```

## 🎮 Usage

- **View Car Images**: Browse through the carousel to see different angles
- **360° View**: Click the 360° button to open an interactive 3D model viewer
- **Calculate Pricing**: Adjust the number of invites and event duration to see real-time pricing
- **View Specifications**: Check out the car overview section for detailed stats

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Customization

### Adding New Cars

1. Add car images to `/public/images/`
2. Add 3D model (.glb file) to `/public/models/`
3. Update the `images` array in `app/page.tsx`
4. Modify the `overviewStats` array with new car specifications

### Styling

The project uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global CSS variables and custom styles

## 🐳 Docker

The project includes Docker support for easy deployment:

- **Development**: Use `docker-compose.yml` for local development
- **Production**: The `Dockerfile` creates an optimized production build

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Developed by [jason21333](https://github.com/jason21333)

---

**Note**: Make sure to have the required 3D model files in `/public/models/` for the 360° viewer to work properly.
