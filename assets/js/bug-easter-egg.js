class BugEasterEgg {
    constructor() {
        this.bug = null;
        this.isActive = false;
        this.timeoutId = null;
        this.boundingBox = {
            top: 0,
            left: 0,
            right: window.innerWidth,
            bottom: window.innerHeight
        };
    }

    createBug() {
        const bug = document.createElement('div');
        bug.className = 'easter-egg-bug';
        bug.innerHTML = '🪲';
        bug.style.position = 'fixed';
        bug.style.zIndex = '9999';
        bug.style.cursor = 'pointer';
        bug.style.fontSize = '24px';
        bug.style.transition = 'transform 0.2s';
        bug.style.transform = 'rotate(0deg)';
        
        // Random starting position
        bug.style.top = Math.random() * (window.innerHeight - 50) + 'px';
        bug.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        
        bug.addEventListener('click', () => {
            bug.style.transform = 'scale(0)';
            setTimeout(() => {
                window.location.href = '/404.html';
            }, 300);
        });

        document.body.appendChild(bug);
        return bug;
    }

    moveBug() {
        if (!this.bug || !this.isActive) return;

        const currentTop = parseInt(this.bug.style.top);
        const currentLeft = parseInt(this.bug.style.left);

        // Random movement
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;

        // Calculate new position
        let newTop = Math.max(this.boundingBox.top, Math.min(this.boundingBox.bottom - 50, currentTop + moveY));
        let newLeft = Math.max(this.boundingBox.left, Math.min(this.boundingBox.right - 50, currentLeft + moveX));

        // Update bug position and rotation
        this.bug.style.top = newTop + 'px';
        this.bug.style.left = newLeft + 'px';
        this.bug.style.transform = `rotate(${Math.atan2(moveY, moveX) * (180 / Math.PI)}deg)`;

        // Schedule next movement
        setTimeout(() => this.moveBug(), Math.random() * 2000 + 1000);
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.bug = this.createBug();
        this.moveBug();

        // Update bounding box on window resize
        window.addEventListener('resize', () => {
            this.boundingBox.right = window.innerWidth;
            this.boundingBox.bottom = window.innerHeight;
        });
    }

    stop() {
        if (!this.isActive) return;
        
        this.isActive = false;
        if (this.bug) {
            this.bug.remove();
            this.bug = null;
        }
    }
}

// Initialize the easter egg when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const bugEasterEgg = new BugEasterEgg();
    
    // Start the bug after 30 seconds
    setTimeout(() => {
        bugEasterEgg.start();
    }, 30000);
}); 