const fs = require('fs');
const file = 'free-git-bot.jsx';
let content = fs.readFileSync(file, 'utf-8');

// Regex to capture emojis
const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

content = content.replace(emojiRegex, '');

// Fix up the empty div where the green block used to be
content = content.replace(/<div style={{width:34,height:34,background:"#2ecc71",\n            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}><\/div>/, 
  '<div style={{width:34,height:34,background:"#2ecc71", display:"flex",alignItems:"center",justifyContent:"center",fontSize:16, fontWeight:"bold", color:"#000"}}>#</div>');

// The multi-green-box in footer
content = content.replace(/ DAILY COMMITS/g, ' DAILY COMMITS');

// We also need to add the update_readme part into the Python template in free-git-bot.jsx!
const pyReplacement = `    print(f"Saved: {fname}")
    return fname

def update_readme():
    readme_path = "README.md"
    if not os.path.exists(readme_path): return
    with open(readme_path, "r") as f:
        content = f.read()
    
    solved_count = 0
    if os.path.exists("solutions"):
        for root, dirs, files in os.walk("solutions"):
            for file in files:
                if file.endswith(".md"):
                    solved_count += 1
    
    import re
    stats_block = f"""
<!-- STATS:START -->
## Progress Stats
- Current Streak: Active
- Total Problems Solved: {solved_count}
<!-- STATS:END -->
"""
    if "<!-- STATS:START -->" in content:
        content = re.sub(r"<!-- STATS:START -->.*?<!-- STATS:END -->", stats_block.strip() + "\\n", content, flags=re.DOTALL)
    else:
        content += "\\n" + stats_block.strip() + "\\n"
        
    with open(readme_path, "w") as f:
        f.write(content)

if __name__ == "__main__":
    p = get_today_problem()
    print(f"Today: {p['title']} ({p['diff']})")
    save(p)
    update_readme()
    print("Done! Commit incoming...")
\`;`;

const targetPy = `    print(f" Saved: {fname}")
    return fname

if __name__ == "__main__":
    p = get_today_problem()
    print(f" Today: {p['title']} ({p['diff']})")
    save(p)
    print(" Done! Commit incoming...")
\`;`;

// Note: Because strip_emojis will remove the emojis from the python script, 
// the target string needs to have the emojis removed.
// We'll just replace the whole main block.

content = content.replace(/    print\(f" Saved: \{fname\}"\)\n    return fname\n\nif __name__ == "__main__":\n    p = get_today_problem\(\)\n    print\(f" Today: \{p\['title'\]\} \(\{p\['diff'\]\}\)"\)\n    save\(p\)\n    print\(" Done! Commit incoming\.\.\."\)\n`;/, pyReplacement);

fs.writeFileSync(file, content);
console.log('Emojis stripped from free-git-bot.jsx');
