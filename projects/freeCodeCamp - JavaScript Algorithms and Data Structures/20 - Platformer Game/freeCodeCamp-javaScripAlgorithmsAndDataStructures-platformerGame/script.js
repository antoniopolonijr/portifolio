const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p"); // to target the paragraph element inside the .checkpoint-screen element.

const ctx = canvas.getContext("2d"); // Before you can begin building out the functionality for the game, you will need to set up the ability to add 2D graphics. The Canvas API can be used to create graphics in games using JavaScript and the HTML canvas element. You will need to use the getContext method which will provide the context for where the graphics will be rendered.
canvas.width = innerWidth; // The canvas element has a width property which is a positive number that represents the width of the canvas. // The innerWidth property is a number that represents the interior width of the browser window.
canvas.height = innerHeight; // The innerHeight property is a number that represents the interior height of the browser window.
const gravity = 0.5; // In your platformer game, the main player will need to jump between the different platforms. When the player jumps, you will need to apply gravity to bring them back down.
let isCheckpointCollisionDetectionActive = true; // In the game, the player will have the opportunity to cross different checkpoints. You will need to keep track of the status for the checkpoint collision detection.

// As you are designing the game, you will need to make sure that the size of the elements in the game are responsive and adapt to different screen sizes.
const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size; // The width and the height of the main player, platforms and checkpoints will be proportional sized relative to the innerHeight of the browser screen. The goal is to make the game responsive and visually consistent across different screen sizes.
};

// to define some characteristics for the main player of the game.
class Player {
  constructor() {
    // define the player's position, velocity, width, and height values.
    this.position = {
      // the proportionalSize function here to make sure that the player's position is always proportional to the screen size. This is important because you want the player to be able to move around the screen regardless of the screen size.
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      // The velocity property will be used to store the player's speed in the x and y directions.
      x: 0,
      y: 0,
    };
    this.width = proportionalSize(40); // the proportionalSize() function here to set the width and height properties of your class to be proportional to the height of the screen.
    this.height = proportionalSize(40);
  }
  draw() {
    // draw() method, which will be responsible for creating the player's width, height, position, and fill color.
    ctx.fillStyle = "#99c9ff"; // to set the color for your player.
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // to create the player's shape by calling the fillRect() method on the ctx object which you instantiated earlier. Example Code: fillRect(x, y, width, height)
  }
  update() {
    // update() method which will be responsible for updating the player's position and velocity as it moves throughout the game.
    this.draw(); // draw() method to ensure that the player is continually drawn on the screen as the game updates.
    this.position.x += this.velocity.x; // When the player moves to the right, you will need to adjust its velocity.
    this.position.y += this.velocity.y; // When the player jumps up, you will need to add the logic for adjusting its velocity.
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      // Right now, when the player jumps up, it is possible for it to move past the height of the canvas. To fix that, you will need to add a condition to stop the player from falling past the height of the canvas.
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
    if (this.position.x < this.width) {
      // to ensure that the player stays within the boundaries of the canvas screen and doesn't move too far off to the left.
      this.position.x = this.width;
    }
    if (this.position.x >= canvas.width - this.width * 2) {
      // to check if the player's x position has exceeded the right edge of the canvas. If it has, you will need to set the player's x position to the maximum value so the player does not accidentally go off screen to the right.
      this.position.x = canvas.width - this.width * 2; // This will ensure that the player's x position will never exceed the right edge of the canvas.
    }
  }
}

// platforms and platform logic.
class Platform {
  constructor(x, y) {
    /*
    When working with objects where the property name and value are the same, you can use the shorthand property name syntax. This syntax allows you to omit the property value if it is the same as the property name.
    Example Code
    // using shorthand property name syntax
    obj = {
      a, b, c
    }
    The following code is the same as:
    Example Code
    obj = {
      a: a,
      b: b,
      c: c
    }
    */
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// logic for the checkpoints. When a player collides with a checkpoint, the checkpoint screen should appear.
class CheckPoint {
  constructor(x, y, z) {
    this.position = {
      x,
      y,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false; // to check if the player has reached the checkpoint.
  }
  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}

const player = new Player();

// list of positions for the platforms.
const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

// list of new platform instances using the Platform class. You will later reference this list to draw the platforms on the canvas.
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

// to create a list of new checkpoint instances using the CheckPoint class.
const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

// functionality for moving the player across the screen
const animate = () => {
  requestAnimationFrame(animate); // The requestAnimationFrame() web API, takes in a callback and is used to update the animation on the screen. The animate function will be responsible for updating the player's position and continually drawing it on the canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height); // As the player moves through the game, you will need to clear the canvas before rendering the next frame of the animation. You can use the clearRect() Web API to accomplish this. It takes in an x, y, width, and height arguments.
  platforms.forEach((platform) => platform.draw()); // to draw each of the platforms onto the canvas.
  checkpoints.forEach((checkpoint) => {
    checkpoint.draw();
  }); // to draw each of the checkpoints onto the canvas.
  player.update(); // to update the player's position as it moves throughout the game.
  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    // to add the logic for increasing or decreasing a player's velocity based on if they move to the left or right of the screen. You need to use the proportionalSize function here to make sure the player's x position is always proportional to the screen size. // Remember that the this keyword should not be used here because that is only for the Player class and not for the player object.
    player.velocity.x = 5;
  } else if (
    keys.leftKey.pressed &&
    player.position.x > proportionalSize(100)
  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    // If you try to start the game, you will notice that the platforms are rendered on the screen. But as the player moves to the right, the platform does not move with it. To fix this issue, you will need to update the platform's x position as the player moves across the screen.
    if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x -= 5;
      });
    } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
      checkpoints.forEach((checkpoint) => {
        checkpoint.position.x += 5;
      });
    }
  }
  // When you start the game, you will notice that the position of the platforms is animating alongside the player. But if you try to jump below one of the platforms, then you will jump right through it. To fix this issue, you will need to add collision detection logic to the game.
  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >=
        platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
    ];
    if (collisionDetectionRules.every((rule) => rule)) {
      // if statement that checks if every rule in the collisionDetectionRules array is truthy.
      player.velocity.y = 0;
      return;
    }
    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];

    if (platformDetectionRules.every((rule) => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    } // Now, when you start the game, you will be able to jump underneath the platform and collide with it.
  });
  // display the checkpoint screen when the player reaches a checkpoint.
  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9, // This will ensure that the player is close enough to the checkpoint to claim it.
      index === 0 || checkpoints[index - 1].claimed === true, // This will ensure that the player can only claim the first checkpoint or a checkpoint that has already been claimed.
    ];
    if (checkpointDetectionRules.every((rule) => rule)) {
      // if statement that checks if every rule in the checkpointDetectionRules array is true.
      checkpoint.claim();
      if (index === checkpoints.length - 1) {
        // checks if the player has reached the last checkpoint.
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if (
        player.position.x >= checkpoint.position.x &&
        player.position.x <= checkpoint.position.x + 40
      ) {
        showCheckpointScreen("You reached a checkpoint!");
      }
    }
  });
};

// To manage the player's movement in the game, you will need to monitor when the left and right arrow keys are pressed.
const keys = {
  rightKey: { pressed: false },
  leftKey: { pressed: false },
};

// functionality that will be responsible for moving the player across the screen.
const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    // In the game, the player will interact with different checkpoints. If the isCheckpointCollisionDetectionActive is false, then you will need to stop the player's movements on the x and y axes.
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }
  switch (key) {
    case "ArrowLeft": // when the left arrow key is pressed
      keys.leftKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x -= xVelocity;
      break;
    case "ArrowUp": // The player can jump up by using the up arrow key or the spacebar
    case " ":
    case "Spacebar":
      player.velocity.y -= 8;
      break;
    case "ArrowRight": // / when the right arrow key is pressed
      keys.rightKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x += xVelocity;
      break;
  }
};

// to see your new player drawn on the screen.
const startGame = () => {
  canvas.style.display = "block"; // to display the canvas element
  startScreen.style.display = "none"; // to hide the startScreen container.
  //player.draw(); // To visualize the player on the screen, you need to draw it on the canvas. // delete player.draw() and call the animate function.
  animate(); // Before you can start moving your player across the screen, you will need to use the animate function.
};

// function that will show the checkpoint message when the player reaches a checkpoint.
const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
  }
};

startBtn.addEventListener("click", startGame); // add the functionality for the start game button.

// event listeners that will be responsible for calling the movePlayer function.
window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
});
window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});
