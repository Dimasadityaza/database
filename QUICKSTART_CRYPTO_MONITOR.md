# ⚡ Quick Start Guide - Crypto Listing Monitor PRO

**Get up and running in 5 minutes!**

---

## 🎯 Goal

Monitor new cryptocurrency listings and collect contact information automatically.

---

## 📦 Step 1: Install Dependencies

```bash
pip install requests pandas openpyxl
```

**Optional** (for progress bars and pretty output):
```bash
pip install tqdm rich
```

Or install everything at once:
```bash
pip install -r requirements_crypto_monitor.txt
```

---

## 🔑 Step 2: Get API Keys

### Option A: CoinMarketCap (Recommended)
1. Go to: https://coinmarketcap.com/api/
2. Click "GET YOUR FREE API KEY NOW"
3. Sign up / log in
4. Copy your API key

### Option B: CoinGecko (Optional)
1. Go to: https://www.coingecko.com/en/api/pricing
2. Sign up for free tier
3. Get your API key from dashboard

**Note:** You need at least ONE API key. CMC is recommended for best results.

---

## ⚙️ Step 3: Configure

### Create .env file:
```bash
# Linux/Mac
cp crypto_monitor.env.example .env

# Windows
copy crypto_monitor.env.example .env
```

### Edit .env and add your keys:
```env
CMC_API_KEY=your_actual_key_here
COINGECKO_API_KEY=your_actual_key_here
```

**Important:**
- Remove `your_actual_key_here` and paste your real key
- No quotes needed
- No spaces around `=`

---

## 🚀 Step 4: Run!

```bash
python crypto_listing_monitor_pro.py
```

**That's it!** The script will:
1. ✅ Fetch new listings from the past 24 hours
2. ✅ Extract contact information
3. ✅ Score and filter leads
4. ✅ Export to Excel

---

## 📊 Step 5: Check Results

Look for a file named:
```
crypto_leads_pro_YYYYMMDD_HHMMSS.xlsx
```

This Excel file has 3 sheets:
- **HIGH_PRIORITY_LEADS** - Best leads (start here!)
- **ALL_LEADS** - All discovered leads
- **STATISTICS** - Run statistics

---

## 🎛️ Customize (Optional)

Edit `config.json` to change settings:

### Get only high-quality leads:
```json
{
  "min_contact_quality": 75,
  "filters": {
    "require_website": true,
    "require_twitter": true,
    "min_social_links": 3
  }
}
```

### Filter by blockchain:
```json
{
  "filters": {
    "chains": ["ethereum", "bsc"]
  }
}
```

### Filter by market cap:
```json
{
  "filters": {
    "min_market_cap": 100000,
    "max_market_cap": 10000000
  }
}
```

---

## ❓ Common Issues

### "No valid API keys found!"
👉 Check your `.env` file exists and has correct format

### "Rate limited"
👉 You're running too often. Wait a few hours between runs.

### "No new leads found"
👉 Normal! This means:
- No new listings in the past 24h, OR
- All leads were already discovered, OR
- Your filters are too strict

**Solution:** Try:
- Increase `lookback_hours` to 48
- Lower `min_contact_quality` to 30
- Remove filter requirements

### Script runs but finds 0 leads from all sources
👉 Check your API keys are valid:
```bash
# Test CMC key
curl -H "X-CMC_PRO_API_KEY: your_key_here" \
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1"
```

---

## 💡 Tips

1. **Run 2-3x per day max** - Don't waste API credits
2. **Check logs** - See `crypto_monitor.log` for details
3. **Backup database** - `crypto_monitor.db` tracks all leads
4. **Use HIGH_PRIORITY sheet** - Start with best leads first

---

## 📅 Recommended Schedule

- **Daily monitoring**: Run once every morning
  - Settings: `lookback_hours: 24`, `cmc_limit: 50`

- **Deep scan**: Run once per week
  - Settings: `lookback_hours: 168`, `cmc_limit: 100`

- **Real-time alerts**: Run every 6 hours
  - Settings: `lookback_hours: 6`, `cmc_limit: 30`

---

## 🎓 Next Steps

1. ✅ Read full documentation: `README_CRYPTO_MONITOR.md`
2. ✅ Experiment with filters in `config.json`
3. ✅ Set up automation (cron/Task Scheduler)
4. ✅ Create outreach templates for contacts

---

## 🆘 Still Need Help?

1. Read the logs: `crypto_monitor.log`
2. Check configuration: validate `config.json` syntax
3. Test API keys: use curl/Postman to verify
4. Review README: Full docs in `README_CRYPTO_MONITOR.md`

---

**Happy hunting! 🚀**
