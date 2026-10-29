import { prisma } from '../server/db.js';
import { autoSeedMoreNews } from '../server/newsSeeder.js';
import { seedMarketData } from '../server/marketSeeder.js';
import { seedBooks } from '../server/bookSeeder.js';
import { seedBricsTopics } from '../server/bricsSeeder.js';
import { seedHistoricalFigures } from '../server/historicalFiguresSeeder.js';
import { seedChineseProducts } from '../server/chineseProductSeeder.js';
import { seedBusinessOpportunities } from '../server/businessOpportunitySeeder.js';
import { seedCulturalExchange } from '../server/culturalExchangeSeeder.js';
import { seedCompositionEngine } from '../server/compositionSeeder.js';
import { seedFooterData } from '../server/footerRoutes.js';
import { seedInstituteData } from '../server/instituteRoutes.js';

async function runAllSeeders() {
  console.log("🚀 Manual Seeder Trigger Started...");
  try {
    const articleCount = await prisma.article.count();
    if (articleCount === 0) {
      console.log("🌱 Seeding news...");
      await autoSeedMoreNews();
    }
    
    await seedMarketData();
    await seedBooks();
    await seedBricsTopics();
    await seedHistoricalFigures();
    await seedChineseProducts();
    await seedBusinessOpportunities();
    await seedCulturalExchange();
    
    console.log("🌱 Seeding composition...");
    await seedCompositionEngine();
    
    console.log("🌱 Seeding footer...");
    await seedFooterData();
    
    console.log("🌱 Seeding institute...");
    await seedInstituteData();
    
    console.log("✅ All seeders finished.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

runAllSeeders();
