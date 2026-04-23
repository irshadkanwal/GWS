# GiftWellSoon PWA

A Progressive Web Application for adding donations. A Gift creation online platform for cancer patients.
Patients or caregivers (administrators) should be able to create a gift registry by choosing products and/or services from a list or add new products, just by filling in basic product
information, similar to a Wedding registry platform.
Patients will have access to a dashboard from which they can manage the registry as well as
other settings.
Donors will access the public registries through the site and will be able to buy products from the list or send money donations.
-The registries can include:
Products associated with affiliate links.
New products added by the patient.
Services associated with Giftcards.
Cash donations (Stripe connect)
-Products will be purchased outside the platform and marked as "claimed" in the registry. -Multiple user access to the same account (patient + caregiver)
-Other pages:
Blog, Personal story page for patients.

## Tech Stack

- Next.js
- PostgreSQL
- Sequelize ORM
- HTML5 QR Code Scanner

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd giftwellsoon
```

2. Install dependencies:

```bash
npm install
```

3. Create a PostgreSQL database:

```bash
createdb gift_well_soon
```

4. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```
DB_NAME=gift_well_soon
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

5. Run database migrations:

```bash
npx sequelize-cli db:migrate
```

6. Seed the database with sample data:

```bash
npx sequelize-cli db:seed:all
```

7. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## PWA Installation

The application can be installed as a PWA on supported devices:

1. Open the application in a supported browser (Chrome, Edge, Safari)
2. Click the install icon in the address bar or use the browser's menu
3. Follow the installation prompts

## Offline Support

The application works offline and will sync data when the connection is restored. This includes:

- QR code scanning
- Manual check-ins
- Employee search

## License

MIT

## Run postgres locally:

docker run --name gift-db \
 -e POSTGRES_DB=gift_well_soon \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_PASSWORD=postgres \
 -p 5432:5432 \
 -d postgres
