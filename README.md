# Daily Graph Contributor Bot

This project automatically generates daily code solutions (like LeetCode problems) and commits them to this repository. It runs 100% free on GitHub Actions!

## How it Works

1. A GitHub Actions workflow (`.github/workflows/daily_commit.yml`) is scheduled to run every day at 9:00 AM UTC.
2. The workflow executes `generate_code.py`.
3. The script selects a coding problem from its built-in bank, generates a markdown file with the solution and key insights, and saves it in the `solutions/` directory.
4. The script also automatically updates this README with your statistics!
5. The workflow then automatically commits and pushes the new files to the repository, giving you a green square on your contribution graph!

## Setup Your Own

You can easily set this up for your own GitHub profile for free:

1. Fork or clone this repository to make it your own (Make sure it's public!).
2. Go to the **Actions** tab in your repository.
3. Click "I understand my workflows, go ahead and enable them" (if prompted).
4. That's it! GitHub will now run the script every day automatically. You can also trigger it manually by clicking "Run workflow".

## Contributing
Want to add more problems to the daily rotation or improve the bot? Check out our [Contribution Guidelines](CONTRIBUTING.md)!

<!-- STATS:START -->
## Progress Stats
- Current Streak: Active
- Total Problems Solved: 2
<!-- STATS:END -->


