import { useState } from "react";

const PROBLEMS = [
  {
    title: "Two Sum",
    topic: "hash map", lang: "python", diff: "Easy",
    code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []

# Example
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
    insight: "Store each number's index in a hash map. For every element, check if its complement already exists — O(n) time."
  },
  {
    title: "Valid Parentheses",
    topic: "stack", lang: "python", diff: "Easy",
    code: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in '({[':
            stack.append(ch)
        elif not stack or stack[-1] != pairs[ch]:
            return False
        else:
            stack.pop()
    return len(stack) == 0

print(is_valid("()[]{}"))  # True`,
    insight: "Push open brackets, pop & verify on close. If stack is empty at end — valid."
  },
  {
    title: "Maximum Subarray",
    topic: "dynamic programming", lang: "python", diff: "Medium",
    code: `def max_subarray(nums):
    max_sum = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)   # extend or restart
        max_sum = max(max_sum, cur)
    return max_sum

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6`,
    insight: "Kadane's algorithm: at each element decide whether to extend the current subarray or start fresh."
  },
  {
    title: "Binary Search",
    topic: "binary search", lang: "python", diff: "Easy",
    code: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(search([-1,0,3,5,9,12], 9))  # 4`,
    insight: "Halve the search space each iteration — O(log n) time."
  },
  {
    title: "Reverse Linked List",
    topic: "linked list", lang: "python", diff: "Easy",
    code: `class Node:
    def __init__(self, val=0, nxt=None):
        self.val, self.next = val, nxt

def reverse(head):
    prev = None
    cur  = head
    while cur:
        nxt       = cur.next
        cur.next  = prev
        prev, cur = cur, nxt
    return prev  # new head`,
    insight: "Three-pointer walk: keep prev, current, and next. Re-wire one node per step."
  },
  {
    title: "Merge Intervals",
    topic: "sorting", lang: "python", diff: "Medium",
    code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

print(merge([[1,3],[2,6],[8,10],[15,18]]))`,
    insight: "Sort by start time. Extend last interval if overlap, else append new one."
  },
  {
    title: "Number of Islands",
    topic: "graph / DFS", lang: "python", diff: "Medium",
    code: `def num_islands(grid):
    def dfs(r, c):
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):
            return
        if grid[r][c] != '1':
            return
        grid[r][c] = '#'  # mark visited
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc)

    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c); count += 1
    return count`,
    insight: "DFS from each unvisited land cell, marking the whole island visited — count equals number of DFS calls."
  },
  {
    title: "Climbing Stairs",
    topic: "dynamic programming", lang: "python", diff: "Easy",
    code: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

# ways(n) = ways(n-1) + ways(n-2)  → Fibonacci!
for i in range(1, 8):
    print(f"stairs={i}: {climb_stairs(i)} ways")`,
    insight: "Each step you can come from n-1 or n-2 — identical to Fibonacci. O(n) time, O(1) space."
  },
  {
    title: "Longest Common Prefix",
    topic: "string", lang: "python", diff: "Easy",
    code: `def longest_common_prefix(strs):
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

print(longest_common_prefix(["flower","flow","flight"]))  # "fl"`,
    insight: "Use the first string as candidate; shrink it until every string starts with it."
  },
  {
    title: "Product of Array Except Self",
    topic: "prefix products", lang: "python", diff: "Medium",
    code: `def product_except_self(nums):
    n   = len(nums)
    out = [1] * n
    # Left pass
    prefix = 1
    for i in range(n):
        out[i] = prefix
        prefix *= nums[i]
    # Right pass
    suffix = 1
    for i in range(n-1, -1, -1):
        out[i] *= suffix
        suffix *= nums[i]
    return out

print(product_except_self([1,2,3,4]))  # [24,12,8,6]`,
    insight: "Two-pass prefix/suffix product — no division, O(n) time, O(1) extra space."
  },
  {
    title: "Fibonacci (Memoized)",
    topic: "recursion + memoization", lang: "python", diff: "Easy",
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print([fib(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    insight: "@lru_cache converts naive O(2^n) recursion into O(n) by caching overlapping sub-problems."
  },
  {
    title: "Find Duplicate Number",
    topic: "Floyd's cycle detection", lang: "python", diff: "Medium",
    code: `def find_duplicate(nums):
    slow = fast = nums[0]
    # Phase 1: detect cycle
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    # Phase 2: find entrance
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow

print(find_duplicate([1,3,4,2,2]))  # 2`,
    insight: "Treat the array as a linked list — Floyd's tortoise and hare finds the cycle entrance = duplicate."
  },
  {
    title: "Rotate Array",
    topic: "two pointers", lang: "python", diff: "Medium",
    code: `def rotate(nums, k):
    n = len(nums)
    k %= n

    def reverse(l, r):
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1; r -= 1

    reverse(0, n-1)
    reverse(0, k-1)
    reverse(k, n-1)

nums = [1,2,3,4,5,6,7]
rotate(nums, 3)
print(nums)  # [5,6,7,1,2,3,4]`,
    insight: "Reverse the whole array, then reverse each part — three O(n) reverses achieve O(1) space rotation."
  },
  {
    title: "Detect Cycle in Linked List",
    topic: "two pointers", lang: "python", diff: "Easy",
    code: `class Node:
    def __init__(self, val):
        self.val  = val
        self.next = None

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
    insight: "Slow moves 1 step, fast moves 2. If they ever meet, there's a cycle — Floyd's algorithm."
  },
];

const WORKFLOW = `name: 🤖 Daily Code Commit

on:
  schedule:
    - cron: "0 9 * * *"   # 9 AM UTC every day
  workflow_dispatch:

permissions:
  contents: write

jobs:
  commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: \${{ secrets.GITHUB_TOKEN }}

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - run: python generate_code.py

      - run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git diff --staged --quiet || git commit -m "🤖 Daily code — $(date +'%b %d, %Y')"
          git push`;

function buildScript(problems) {
  const data = JSON.stringify(problems.map(p => ({
    title: p.title, topic: p.topic, lang: p.lang,
    diff: p.diff, code: p.code, insight: p.insight
  })), null, 2);

  return `"""Daily Code Generator — zero external dependencies, 100% free"""
import datetime, os, json

PROBLEMS = ${data}

def get_today_problem():
    today = datetime.date.today()
    idx   = today.toordinal() % len(PROBLEMS)
    return PROBLEMS[idx]

def save(p):
    today     = datetime.date.today()
    month_dir = f"solutions/{today.year}/{today.strftime('%m-%B')}"
    os.makedirs(month_dir, exist_ok=True)
    fname = f"{month_dir}/{today}.md"

    with open(fname, "w") as f:
        f.write(f"# {p['title']}\\n\\n")
        f.write(f"**Topic:** {p['topic']}  \\n")
        f.write(f"**Language:** {p['lang']}  \\n")
        f.write(f"**Difficulty:** {p['diff']}  \\n\\n")
        f.write(f"## Solution\\n\\n\`\`\`{p['lang']}\\n{p['code']}\\n\`\`\`\\n\\n")
        f.write(f"## Key Insight\\n{p['insight']}\\n")

    print(f"✅ Saved: {fname}")
    return fname

if __name__ == "__main__":
    p = get_today_problem()
    print(f"📌 Today: {p['title']} ({p['diff']})")
    save(p)
    print("🎉 Done! Commit incoming...")
`;
}

function highlight(code) {
  return code
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/(#[^\n<]*)/g,'<span style="color:#6a9955">$1</span>')
    .replace(/\b(def|class|import|from|return|if|else|elif|for|while|in|not|and|or|True|False|None|break|continue|with|as|pass|print)\b/g,'<span style="color:#c792ea">$1</span>')
    .replace(/("[^"]*"|'[^']*')/g,'<span style="color:#c3e88d">$1</span>')
    .replace(/\b(\d+)\b/g,'<span style="color:#f78c6c">$1</span>');
}

export default function App() {
  const today   = new Date();
  const todayIdx = (Math.floor(today.getTime() / 86400000) + 719163) % PROBLEMS.length;
  const todayP  = PROBLEMS[todayIdx];

  const [tab, setTab] = useState("preview");
  const [copied, setCopied] = useState("");

  function copy(text, key) {
    navigator.clipboard.writeText(text).catch(()=>{});
    setCopied(key);
    setTimeout(() => setCopied(""), 1800);
  }

  const script = buildScript(PROBLEMS);

  return (
    <div style={{ minHeight:"100vh", background:"#0c0c0c", color:"#ddd",
      fontFamily:"'JetBrains Mono','Fira Code',monospace", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#2ecc71}
        .tab{background:none;border:none;cursor:pointer;font-family:inherit;font-size:11px;
          letter-spacing:.1em;padding:10px 20px;color:#444;transition:.15s;text-transform:uppercase}
        .tab.on{color:#0c0c0c;background:#2ecc71;font-weight:700}
        .tab:not(.on):hover{color:#2ecc71}
        .cp{background:#111;border:1px solid #222;color:#2ecc71;cursor:pointer;
          font-family:inherit;font-size:10px;padding:4px 12px;transition:.15s;letter-spacing:.08em}
        .cp:hover{background:#2ecc71;color:#000}
        .badge{display:inline-block;padding:2px 8px;font-size:10px;font-weight:700;letter-spacing:.12em}
        @keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
        .fade{animation:fadein .3s ease}
      `}</style>

      {/* HEADER */}
      <div style={{borderBottom:"1px solid #181818",padding:"18px 28px",
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:34,height:34,background:"#2ecc71",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🟩</div>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:"#fff",letterSpacing:"-.01em"}}>
              FREE GIT GRAPH BOT
            </div>
            <div style={{fontSize:9,color:"#333",letterSpacing:".15em",textTransform:"uppercase"}}>
              no api · no cost · commits daily
            </div>
          </div>
        </div>
        <div style={{textAlign:"right",fontSize:10}}>
          <div style={{color:"#2ecc71"}}>{today.toDateString()}</div>
          <div style={{color:"#333",marginTop:3}}>
            {PROBLEMS.length} problems in bank · rotates daily
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{borderBottom:"1px solid #161616",display:"flex",paddingLeft:12}}>
        {[["preview","📌 Today's Problem"],["workflow","🔄 workflow.yml"],["script","🐍 generate.py"],["setup","📋 Setup"]].map(([id,label])=>(
          <button key={id} className={`tab ${tab===id?"on":""}`} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      <div style={{flex:1,padding:"24px 28px",maxWidth:860,width:"100%",margin:"0 auto"}} className="fade">

        {/* PREVIEW */}
        {tab==="preview" && (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#fff"}}>
                {todayP.title}
              </div>
              <span className="badge" style={{
                background: todayP.diff==="Hard"?"#3d1a0d": todayP.diff==="Medium"?"#2d2a0d":"#0d2d18",
                color: todayP.diff==="Hard"?"#f78c6c": todayP.diff==="Medium"?"#ffcb6b":"#2ecc71"
              }}>{todayP.diff}</span>
              <span className="badge" style={{background:"#0d1a2d",color:"#82aaff"}}>{todayP.topic}</span>
              <span className="badge" style={{background:"#1a0d2d",color:"#c792ea"}}>{todayP.lang}</span>
            </div>

            <div style={{background:"#090909",border:"1px solid #1c1c1c",position:"relative"}}>
              <div style={{borderBottom:"1px solid #161616",padding:"7px 14px",display:"flex",
                justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:5}}>
                  {["#ff5f56","#ffbd2e","#27c93f"].map(c=>(
                    <div key={c} style={{width:9,height:9,borderRadius:"50%",background:c}}/>
                  ))}
                </div>
                <span style={{fontSize:10,color:"#333"}}>solution.py</span>
                <button className="cp" onClick={()=>copy(todayP.code,"code")}>
                  {copied==="code"?"✓ copied":"copy"}
                </button>
              </div>
              <pre style={{padding:"18px 22px",fontSize:12.5,lineHeight:1.75,overflowX:"auto",color:"#aaa"}}
                dangerouslySetInnerHTML={{__html:highlight(todayP.code)}}/>
            </div>

            <div style={{background:"#0d1f14",border:"1px solid #1a3d24",padding:"14px 18px",
              display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{color:"#2ecc71",fontSize:16,flexShrink:0}}>💡</span>
              <div>
                <div style={{fontSize:10,color:"#2ecc71",letterSpacing:".12em",textTransform:"uppercase",
                  fontWeight:700,marginBottom:4}}>Key Insight</div>
                <div style={{fontSize:12,color:"#7ab88a",lineHeight:1.6}}>{todayP.insight}</div>
              </div>
            </div>

            {/* progress strip */}
            <div style={{fontSize:10,color:"#2a2a2a",marginTop:4}}>
              <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
                {PROBLEMS.map((p,i)=>(
                  <div key={i} title={p.title} style={{
                    width:18,height:18,background: i===todayIdx?"#2ecc71":"#161616",
                    border: i===todayIdx?"1px solid #27ae60":"1px solid #1c1c1c",
                    fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",
                    color: i===todayIdx?"#000":"#333", cursor:"default",
                    transition:".1s"
                  }}>{i+1}</div>
                ))}
              </div>
              <span style={{color:"#333"}}>Problem {todayIdx+1} of {PROBLEMS.length} · rotates daily automatically</span>
            </div>
          </div>
        )}

        {/* WORKFLOW */}
        {tab==="workflow" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,color:"#fff",fontWeight:600}}>.github/workflows/daily_commit.yml</div>
                <div style={{fontSize:10,color:"#444",marginTop:3}}>Free — GitHub Actions is free for public repos</div>
              </div>
              <button className="cp" onClick={()=>copy(WORKFLOW,"wf")}>{copied==="wf"?"✓ copied":"copy"}</button>
            </div>
            <div style={{background:"#090909",border:"1px solid #1a1a1a"}}>
              <pre style={{padding:"18px 22px",fontSize:12,lineHeight:1.8,overflowX:"auto",color:"#999"}}
                dangerouslySetInnerHTML={{__html:highlight(WORKFLOW)}}/>
            </div>
          </div>
        )}

        {/* SCRIPT */}
        {tab==="script" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:12,color:"#fff",fontWeight:600}}>generate_code.py</div>
                <div style={{fontSize:10,color:"#444",marginTop:3}}>Pure Python stdlib — zero dependencies, zero cost</div>
              </div>
              <button className="cp" onClick={()=>copy(script,"py")}>{copied==="py"?"✓ copied":"copy"}</button>
            </div>
            <div style={{background:"#090909",border:"1px solid #1a1a1a"}}>
              <pre style={{padding:"18px 22px",fontSize:11.5,lineHeight:1.75,overflowX:"auto",color:"#999",maxHeight:480}}
                dangerouslySetInnerHTML={{__html:highlight(script)}}/>
            </div>
          </div>
        )}

        {/* SETUP */}
        {tab==="setup" && (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{fontSize:12,color:"#2ecc71",letterSpacing:".1em",textTransform:"uppercase",fontWeight:700}}>
              Setup — totally free, 4 steps
            </div>
            {[
              ["Create a public GitHub repo",`git init daily-code && cd daily-code\ngit remote add origin https://github.com/YOUR_USER/daily-code`],
              ["Add the two files",`# Copy from the tabs above into repo root:\ngenerate_code.py\n.github/workflows/daily_commit.yml`],
              ["Push to GitHub",`git add .\ngit commit -m "🚀 init"\ngit push -u origin main`],
              ["Enable Actions & test",`# Go to: repo → Actions tab → enable workflows\n# Then: Actions → Daily Code Commit → Run workflow\n# Check solutions/ folder for today's file ✅`],
            ].map(([title,code],i)=>(
              <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:26,height:26,background:"#2ecc71",color:"#000",display:"flex",
                  alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,flexShrink:0}}>
                  {i+1}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:"#fff",fontWeight:600,marginBottom:6}}>{title}</div>
                  <div style={{background:"#090909",border:"1px solid #181818",padding:"10px 14px",position:"relative"}}>
                    <button className="cp" style={{position:"absolute",top:8,right:8}}
                      onClick={()=>copy(code,`step${i}`)}>{copied===`step${i}`?"✓":"copy"}</button>
                    <pre style={{fontSize:11,lineHeight:1.7,color:"#777",paddingRight:52}}
                      dangerouslySetInnerHTML={{__html:highlight(code)}}/>
                  </div>
                </div>
              </div>
            ))}
            <div style={{background:"#0d1020",border:"1px solid #1a2040",padding:"14px 18px",marginTop:4}}>
              <div style={{fontSize:11,color:"#82aaff",fontWeight:700,marginBottom:4}}>💰 Cost breakdown</div>
              <div style={{fontSize:11,color:"#334",lineHeight:1.8}}>
                GitHub Actions (public repo): <span style={{color:"#2ecc71"}}>FREE</span><br/>
                API keys needed: <span style={{color:"#2ecc71"}}>NONE</span><br/>
                External services: <span style={{color:"#2ecc71"}}>NONE</span><br/>
                Daily commits forever: <span style={{color:"#2ecc71"}}>✅ FREE</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{borderTop:"1px solid #131313",padding:"10px 28px",display:"flex",
        justifyContent:"space-between",fontSize:9,color:"#222",letterSpacing:".1em"}}>
        <span>FREE GIT GRAPH BOT · ZERO COST</span>
        <span style={{color:"#1a3d24"}}>🟩🟩🟩🟩🟩🟩🟩 DAILY COMMITS</span>
      </div>
    </div>
  );
}
