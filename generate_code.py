"""Daily Code Generator — zero external dependencies, 100% free"""
import datetime, os, json, re

PROBLEMS = [
  {
    "title": "Two Sum",
    "topic": "hash map",
    "lang": "python",
    "diff": "Easy",
    "code": "def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        complement = target - n\n        if complement in seen:\n            return [seen[complement], i]\n        seen[n] = i\n    return []\n\n# Example\nprint(two_sum([2, 7, 11, 15], 9))  # [0, 1]",
    "insight": "Store each number's index in a hash map. For every element, check if its complement already exists — O(n) time."
  },
  {
    "title": "Valid Parentheses",
    "topic": "stack",
    "lang": "python",
    "diff": "Easy",
    "code": "def is_valid(s):\n    stack = []\n    pairs = {')': '(', '}': '{', ']': '['}\n    for ch in s:\n        if ch in '({[':\n            stack.append(ch)\n        elif not stack or stack[-1] != pairs[ch]:\n            return False\n        else:\n            stack.pop()\n    return len(stack) == 0\n\nprint(is_valid(\"()[]{}\"))  # True",
    "insight": "Push open brackets, pop & verify on close. If stack is empty at end — valid."
  },
  {
    "title": "Maximum Subarray",
    "topic": "dynamic programming",
    "lang": "python",
    "diff": "Medium",
    "code": "def max_subarray(nums):\n    max_sum = cur = nums[0]\n    for n in nums[1:]:\n        cur = max(n, cur + n)   # extend or restart\n        max_sum = max(max_sum, cur)\n    return max_sum\n\nprint(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6",
    "insight": "Kadane's algorithm: at each element decide whether to extend the current subarray or start fresh."
  },
  {
    "title": "Binary Search",
    "topic": "binary search",
    "lang": "python",
    "diff": "Easy",
    "code": "def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1\n\nprint(search([-1,0,3,5,9,12], 9))  # 4",
    "insight": "Halve the search space each iteration — O(log n) time."
  },
  {
    "title": "Reverse Linked List",
    "topic": "linked list",
    "lang": "python",
    "diff": "Easy",
    "code": "class Node:\n    def __init__(self, val=0, nxt=None):\n        self.val, self.next = val, nxt\n\ndef reverse(head):\n    prev = None\n    cur  = head\n    while cur:\n        nxt       = cur.next\n        cur.next  = prev\n        prev, cur = cur, nxt\n    return prev  # new head",
    "insight": "Three-pointer walk: keep prev, current, and next. Re-wire one node per step."
  },
  {
    "title": "Merge Intervals",
    "topic": "sorting",
    "lang": "python",
    "diff": "Medium",
    "code": "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for start, end in intervals[1:]:\n        if start <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], end)\n        else:\n            merged.append([start, end])\n    return merged\n\nprint(merge([[1,3],[2,6],[8,10],[15,18]]))",
    "insight": "Sort by start time. Extend last interval if overlap, else append new one."
  },
  {
    "title": "Number of Islands",
    "topic": "graph / DFS",
    "lang": "python",
    "diff": "Medium",
    "code": "def num_islands(grid):\n    def dfs(r, c):\n        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]):\n            return\n        if grid[r][c] != '1':\n            return\n        grid[r][c] = '#'  # mark visited\n        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            dfs(r+dr, c+dc)\n\n    count = 0\n    for r in range(len(grid)):\n        for c in range(len(grid[0])):\n            if grid[r][c] == '1':\n                dfs(r, c); count += 1\n    return count",
    "insight": "DFS from each unvisited land cell, marking the whole island visited — count equals number of DFS calls."
  },
  {
    "title": "Climbing Stairs",
    "topic": "dynamic programming",
    "lang": "python",
    "diff": "Easy",
    "code": "def climb_stairs(n):\n    a, b = 1, 1\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return b\n\n# ways(n) = ways(n-1) + ways(n-2)  → Fibonacci!\nfor i in range(1, 8):\n    print(f\"stairs={i}: {climb_stairs(i)} ways\")",
    "insight": "Each step you can come from n-1 or n-2 — identical to Fibonacci. O(n) time, O(1) space."
  },
  {
    "title": "Longest Common Prefix",
    "topic": "string",
    "lang": "python",
    "diff": "Easy",
    "code": "def longest_common_prefix(strs):\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                return \"\"\n    return prefix\n\nprint(longest_common_prefix([\"flower\",\"flow\",\"flight\"]))  # \"fl\"",
    "insight": "Use the first string as candidate; shrink it until every string starts with it."
  },
  {
    "title": "Product of Array Except Self",
    "topic": "prefix products",
    "lang": "python",
    "diff": "Medium",
    "code": "def product_except_self(nums):\n    n   = len(nums)\n    out = [1] * n\n    # Left pass\n    prefix = 1\n    for i in range(n):\n        out[i] = prefix\n        prefix *= nums[i]\n    # Right pass\n    suffix = 1\n    for i in range(n-1, -1, -1):\n        out[i] *= suffix\n        suffix *= nums[i]\n    return out\n\nprint(product_except_self([1,2,3,4]))  # [24,12,8,6]",
    "insight": "Two-pass prefix/suffix product — no division, O(n) time, O(1) extra space."
  },
  {
    "title": "Fibonacci (Memoized)",
    "topic": "recursion + memoization",
    "lang": "python",
    "diff": "Easy",
    "code": "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint([fib(i) for i in range(10)])\n# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
    "insight": "@lru_cache converts naive O(2^n) recursion into O(n) by caching overlapping sub-problems."
  },
  {
    "title": "Find Duplicate Number",
    "topic": "Floyd's cycle detection",
    "lang": "python",
    "diff": "Medium",
    "code": "def find_duplicate(nums):\n    slow = fast = nums[0]\n    # Phase 1: detect cycle\n    while True:\n        slow = nums[slow]\n        fast = nums[nums[fast]]\n        if slow == fast:\n            break\n    # Phase 2: find entrance\n    slow = nums[0]\n    while slow != fast:\n        slow = nums[slow]\n        fast = nums[fast]\n    return slow\n\nprint(find_duplicate([1,3,4,2,2]))  # 2",
    "insight": "Treat the array as a linked list — Floyd's tortoise and hare finds the cycle entrance = duplicate."
  },
  {
    "title": "Rotate Array",
    "topic": "two pointers",
    "lang": "python",
    "diff": "Medium",
    "code": "def rotate(nums, k):\n    n = len(nums)\n    k %= n\n\n    def reverse(l, r):\n        while l < r:\n            nums[l], nums[r] = nums[r], nums[l]\n            l += 1; r -= 1\n\n    reverse(0, n-1)\n    reverse(0, k-1)\n    reverse(k, n-1)\n\nnums = [1,2,3,4,5,6,7]\nrotate(nums, 3)\nprint(nums)  # [5,6,7,1,2,3,4]",
    "insight": "Reverse the whole array, then reverse each part — three O(n) reverses achieve O(1) space rotation."
  },
  {
    "title": "Detect Cycle in Linked List",
    "topic": "two pointers",
    "lang": "python",
    "diff": "Easy",
    "code": "class Node:\n    def __init__(self, val):\n        self.val  = val\n        self.next = None\n\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False",
    "insight": "Slow moves 1 step, fast moves 2. If they ever meet, there's a cycle — Floyd's algorithm."
  }
]

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
        f.write(f"# {p['title']}\n\n")
        f.write(f"**Topic:** {p['topic']}  \n")
        f.write(f"**Language:** {p['lang']}  \n")
        f.write(f"**Difficulty:** {p['diff']}  \n\n")
        f.write(f"## Solution\n\n```{p['lang']}\n{p['code']}\n```\n\n")
        f.write(f"## Key Insight\n{p['insight']}\n")

    print(f"Saved: {fname}")
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
