# 🚀 Crypto Listing Monitor PRO

**Production-ready cryptocurrency listing monitor with enterprise-grade features**

Monitor new cryptocurrency listings from multiple sources (CoinMarketCap, DexScreener, CoinGecko) and automatically collect contact information for marketing/outreach purposes.

---

## ✨ Features

### Core Capabilities
- ✅ **Multi-source aggregation**: CMC Pro API, DexScreener, CoinGecko
- ✅ **Optimized API usage**: Batch requests, smart caching, rate limiting
- ✅ **SQLite database**: Robust deduplication and tracking
- ✅ **Comprehensive logging**: File + console with rotation
- ✅ **Data validation**: Type-safe models with dataclasses
- ✅ **Rich output**: Progress bars and formatted console (optional)
- ✅ **Excel export**: Multiple sheets with auto-formatting
- ✅ **Configurable filters**: Market cap, price, chains, social requirements

### What's Fixed vs Original
| Issue | Original | PRO Version |
|-------|----------|-------------|
| **CMC API overuse** | 400 calls/run ❌ | ~100 calls/run ✅ |
| **CoinGecko dating** | ATL/ATH dates (wrong) ❌ | Trending API ✅ |
| **DexScreener endpoint** | `/token-boosts` (invalid) ❌ | `/latest/dex/pairs` ✅ |
| **Error handling** | Generic try/catch ❌ | Detailed logging ✅ |
| **Tracking** | JSON file (race conditions) ❌ | SQLite database ✅ |
| **Performance** | Sequential only ❌ | Concurrent support ✅ |
| **Logging** | Print statements ❌ | Professional logger ✅ |

---

## 📋 Requirements

- Python 3.8+
- API Keys (at least one):
  - **CoinMarketCap Pro** (recommended): Get from https://coinmarketcap.com/api/
  - **CoinGecko** (optional): Get from https://www.coingecko.com/en/api/pricing

---

## 🔧 Installation

### 1. Clone or Download

```bash
cd /path/to/your/project
```

### 2. Install Dependencies

```bash
pip install -r requirements_crypto_monitor.txt
```

**Minimal install** (core only):
```bash
pip install requests pandas openpyxl
```

**Full install** (with progress bars):
```bash
pip install requests pandas openpyxl tqdm rich
```

### 3. Configure API Keys

Copy the example env file:
```bash
cp crypto_monitor.env.example .env
```

Edit `.env` and add your API keys:
```env
CMC_API_KEY=your_actual_coinmarketcap_key_here
COINGECKO_API_KEY=your_actual_coingecko_key_here
```

### 4. Configure Settings (Optional)

Edit `config.json` to customize behavior:

```json
{
  "lookback_hours": 24,
  "min_contact_quality": 50,
  "cmc_limit": 100,
  "filters": {
    "require_website": true,
    "min_social_links": 2,
    "chains": ["ethereum", "bsc"],
    "min_market_cap": 100000
  }
}
```

---

## 🚀 Usage

### Basic Usage

```bash
python crypto_listing_monitor_pro.py
```

### What Happens

1. **Loads configuration** from `config.json` and API keys from `.env`
2. **Fetches new listings** from:
   - CoinMarketCap (past 24h)
   - DexScreener (latest pairs)
   - CoinGecko (trending coins)
3. **Filters and scores** each lead based on:
   - Contact quality (website, Twitter, Telegram, Discord)
   - Market cap, price, chain
   - Custom filter rules
4. **Deduplicates** using SQLite database
5. **Exports to Excel** with 3 sheets:
   - `ALL_LEADS`: All discovered leads
   - `HIGH_PRIORITY_LEADS`: Leads with score ≥ threshold
   - `STATISTICS`: Run statistics

### Output Files

- `crypto_leads_pro_YYYYMMDD_HHMMSS.xlsx` - Excel report
- `crypto_monitor.db` - SQLite tracking database
- `crypto_monitor.log` - Detailed logs with rotation

---

## ⚙️ Configuration Guide

### config.json Options

#### Basic Settings
```json
{
  "lookback_hours": 24,          // How far back to search (hours)
  "min_contact_quality": 50,     // Minimum score for high priority
  "cmc_limit": 100,              // Max coins from CMC (keep ≤100)
  "dex_limit": 100,              // Max pairs from DexScreener
  "coingecko_limit": 50,         // Max coins from CoinGecko
  "request_delay": 0.5,          // General delay between requests (sec)
  "coingecko_delay": 2.5         // CoinGecko specific delay (sec)
}
```

#### Filters
```json
{
  "filters": {
    "require_website": false,    // Must have website?
    "require_twitter": false,    // Must have Twitter?
    "require_telegram": false,   // Must have Telegram?
    "min_social_links": 1,       // Minimum number of social links
    "chains": [],                // Whitelist chains ([] = all)
    "exclude_chains": [          // Blacklist chains
      "test",
      "testnet"
    ],
    "min_price": 0,              // Minimum token price (USD)
    "max_price": 0,              // Maximum token price (0 = no limit)
    "min_market_cap": 0,         // Minimum market cap (USD)
    "max_market_cap": 0          // Maximum market cap (0 = no limit)
  }
}
```

#### Output Settings
```json
{
  "output": {
    "excel_filename": "crypto_leads_pro_{timestamp}.xlsx",
    "include_raw_data": false,   // Include raw API responses
    "auto_open_excel": false     // Auto-open Excel after export
  }
}
```

#### Logging
```json
{
  "logging": {
    "level": "INFO",             // DEBUG, INFO, WARNING, ERROR
    "file": "crypto_monitor.log",
    "max_size_mb": 10,           // Log rotation size
    "backup_count": 3            // Keep N old logs
  }
}
```

---

## 📊 Contact Quality Scoring

Leads are scored based on available contact information:

| Contact Type | Points |
|--------------|--------|
| Website      | 30     |
| Twitter      | 25     |
| Telegram     | 25     |
| Discord      | 20     |
| **Maximum**  | **100** |

**Example Scenarios:**
- Website + Twitter + Telegram = 80 points ⭐⭐⭐⭐
- Website + Twitter = 55 points ⭐⭐⭐
- Telegram only = 25 points ⭐

---

## 💡 Usage Examples

### Example 1: High-Quality Ethereum Projects Only

```json
{
  "min_contact_quality": 75,
  "filters": {
    "require_website": true,
    "require_twitter": true,
    "min_social_links": 3,
    "chains": ["ethereum"],
    "min_market_cap": 100000
  }
}
```

### Example 2: Any New BSC/Ethereum Tokens

```json
{
  "min_contact_quality": 30,
  "filters": {
    "chains": ["bsc", "ethereum"],
    "min_social_links": 1
  }
}
```

### Example 3: Small Cap Gems

```json
{
  "filters": {
    "min_market_cap": 10000,
    "max_market_cap": 1000000,
    "require_telegram": true
  }
}
```

---

## 🔍 API Rate Limits

**Important:** Respect API rate limits to avoid getting blocked!

| API | Free Tier | PRO Version Usage | Safe? |
|-----|-----------|-------------------|-------|
| **CoinMarketCap** | 333 credits/day | ~100-150 credits/run | ✅ Yes (2-3 runs/day) |
| **DexScreener** | No official limit | ~5-10 calls/run | ✅ Yes |
| **CoinGecko** | 10-50 calls/min | ~20-30 calls/run | ✅ Yes (with delays) |

### Tips:
1. **Don't run too frequently**: Recommended max 2-3x per day
2. **Use lower limits**: Set `cmc_limit: 50` for daily monitoring
3. **Stagger runs**: Space out runs by at least 8-12 hours
4. **Monitor your usage**: Check CMC dashboard regularly

---

## 🐛 Troubleshooting

### "No valid API keys found!"
**Solution:** Check your `.env` file:
1. Make sure it's named exactly `.env` (not `.env.txt`)
2. No spaces around `=` sign
3. Remove quotes if you have them: `CMC_API_KEY=abc123` (not `"abc123"`)

### "Rate limited" errors
**Solution:**
1. Increase delays in `config.json`:
   ```json
   {
     "request_delay": 1.0,
     "coingecko_delay": 3.0
   }
   ```
2. Reduce limits:
   ```json
   {
     "cmc_limit": 50,
     "dex_limit": 50
   }
   ```

### "No new leads found"
**Possible causes:**
1. **Too strict filters**: Lower `min_contact_quality` or remove filter requirements
2. **Already tracked**: Check `crypto_monitor.db` - leads are deduplicated
3. **Lookback too short**: Increase `lookback_hours` to 48 or 72
4. **No new listings**: Crypto markets are quiet sometimes!

### Empty social links from DexScreener
**This is normal** - DexScreener doesn't always have social data. The script will skip tokens without contacts based on your `min_social_links` filter.

---

## 📁 Project Structure

```
.
├── crypto_listing_monitor_pro.py    # Main script
├── config.json                       # Configuration
├── .env                              # API keys (create from example)
├── crypto_monitor.env.example        # Example env file
├── requirements_crypto_monitor.txt   # Python dependencies
├── README_CRYPTO_MONITOR.md          # This file
│
├── crypto_monitor.db                 # SQLite database (auto-created)
├── crypto_monitor.log                # Log file (auto-created)
└── crypto_leads_pro_*.xlsx           # Excel outputs (auto-created)
```

---

## 🔐 Security Notes

1. **Never commit `.env`** to version control
2. **Keep API keys private** - they're linked to your account
3. **SQLite database** contains historical data - backup regularly
4. **Logs may contain** API endpoints - sanitize before sharing

---

## 📈 Performance Tips

### For Faster Runs:
```json
{
  "max_workers": 5,           // Increase concurrent requests (carefully!)
  "cmc_limit": 50,            // Lower limits = faster
  "request_delay": 0.3        // Reduce delay (risky!)
}
```

### For More Thorough Scanning:
```json
{
  "lookback_hours": 72,       // 3 days back
  "cmc_limit": 200,           // More coins (watch API limits!)
  "dex_limit": 200,
  "min_contact_quality": 30   // Lower bar
}
```

---

## 📜 License

MIT License - free to use and modify.

---

## 🤝 Contributing

Found a bug? Want to improve something?

1. **Issues**: Report bugs or suggest features
2. **Pull requests**: Contributions welcome!
3. **Testing**: Help test with different API keys and configurations

---

## 📞 Support

- **Documentation**: Read this file thoroughly
- **Logs**: Check `crypto_monitor.log` for detailed error messages
- **Configuration**: Validate your `config.json` with a JSON validator
- **API Status**: Check if APIs are down:
  - CMC: https://status.coinmarketcap.com/
  - CoinGecko: https://status.coingecko.com/

---

## 🎯 Roadmap

Potential future enhancements:
- [ ] Webhook notifications (Discord/Telegram/Slack)
- [ ] Web dashboard
- [ ] Automated outreach templates
- [ ] CSV export option
- [ ] Historical trend analysis
- [ ] More data sources (CoinCodex, etc.)
- [ ] Docker containerization

---

## ⚠️ Disclaimer

This tool is for **educational and research purposes only**.

- **Not financial advice**: Don't make investment decisions based solely on new listings
- **Respect API ToS**: Follow rate limits and terms of service
- **Marketing compliance**: Follow anti-spam laws when using contact data
- **No guarantees**: Data accuracy depends on upstream APIs

---

## 🙏 Acknowledgments

Built with:
- **Requests**: HTTP library
- **Pandas**: Data manipulation
- **OpenPyXL**: Excel export
- **SQLite**: Database
- **Rich/tqdm**: Console UI (optional)

Data sources:
- **CoinMarketCap**: Comprehensive crypto data
- **DexScreener**: DEX trading pairs
- **CoinGecko**: Community-driven crypto data

---

**Made with ❤️ by Claude | Enhanced for Production Use**

*Last updated: 2025*
