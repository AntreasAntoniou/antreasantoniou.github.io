# Agent Toolkit download counter

The public badge sums **ClawHub download events** for verified listed skills in
[`skills/catalogue.json`](../skills/catalogue.json). It does not count unique
people, tracked installs, Git clones, or GitHub release-asset downloads. Catalogue
entries explicitly marked `clawhubPending` may return 404 while awaiting their
first publication; they are listed in `pendingSkills`, not counted as zero.
The next successful refresh includes them automatically once publicly listed.
Any previously measured listing becoming unavailable fails the refresh.

[`clawhub-downloads.json`](clawhub-downloads.json) contains the total, UTC check
time, per-skill counts and exact public API sources. The SVG is generated from
that same snapshot. Only real API data is published; test inputs stay in tests.

The `Update ClawHub downloads` GitHub Action runs daily at 06:23 UTC and supports
manual dispatch. GitHub may delay scheduled runs and disable inactive schedules;
check the Actions tab if the badge's verification date stops advancing.

Every source must succeed and validate. An error, wrong owner, missing count or
decrease fails the run without publishing a partial total. Review genuine
upstream corrections explicitly rather than silently retaining an inflated value.

The website and GitHub profile embed the same SVG from raw.githubusercontent.com.
This avoids reliance on GitHub Pages rebuilding after a GITHUB_TOKEN bot commit
(such commits do not trigger legacy Pages builds). GitHub/CDN image caches can
delay display updates; the badge always carries its actual verification date.
No new service, personal access token, or paid hosting is required.
