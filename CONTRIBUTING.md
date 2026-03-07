# Contributing to Daily Graph Contributor Bot

We love your input! We want to make contributing to this repository as easy and transparent as possible.

## How to Contribute New Problems

If you want to add more solutions to the bot's daily rotation, you can directly update the script:

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Open** `generate_code.py`
4. Expand the `PROBLEMS` array near the top of the file. Add a new dictionary following the existing format:
   ```python
   {
       "title": "Your Problem Title",
       "topic": "algorithm/data structure", 
       "lang": "python", 
       "diff": "Easy/Medium/Hard",
       "code": "print('Your code here')",
       "insight": "Explain the key trick or logic here."
   }
   ```
5. **Commit** changes to your own branch
6. **Push** your work back up to your fork
7. Submit a **Pull request** so that we can review your changes!

## Found a Bug?
If you find a bug in the code generator or one of the existing solutions, feel free to open an **Issue** on the repository outlining what the bug is and how to reproduce it, or just submit a pull request with the fix!
