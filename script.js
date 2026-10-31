document.addEventListener('DOMContentLoaded', () => {
  // Floating Grain Animation
  const canvas = document.getElementById('grainCanvas');
  const ctx = canvas.getContext('2d');
  let grains = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Grain {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 2;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.speedX = Math.sin(this.y) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.4;
      this.rotation += this.rotSpeed;
      if (this.y < -10) this.reset(), this.y = canvas.height + 10;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = `rgba(82, 183, 136, ${this.opacity})`;
      ctx.beginPath();
      // Draw tiny seed/grain shape (oval-like)
      ctx.ellipse(0, 0, this.size, this.size * 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 40; i++) grains.push(new Grain());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grains.forEach(g => {
      g.update();
      g.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();

  // Client-side Form Handling
  const form = document.getElementById('subscribeForm');
  const thankYou = document.getElementById('thankYou');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    thankYou.style.display = 'block';
  });
});