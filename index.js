/*
PROMPT: Given an image represented by an N x N matrix, where each pixel in the image is represented by an integer, write a method to rotate the image by 90 degrees. Can you do this in place? 

Hints:
#1. Try thinking about it layer by later. Can you rotate a specific layer? 
#2. Rotating a specific layer would just mean swapping the values in four arrays. If you were asked to swap the values in two arrays, could you do this? Can you then extend it to four arrays? 
*/ 

function rotateImageby90(img, layer = 0) {
    // First we create a helper variable to keep track of the X by X dimensions of our image 
    let n = img.length;

    // Base case: For an image of odd dimensions, we stop before the central layer since that innermost layer will jsut be a 1x1 cube. For an even dimension image, however, we go through all layers, since the innermost layer will be a 2x2 cube..
    if (n % 2 === 0 && layer >= n / 2) return img;
    if (n % 2 !== 0 && layer >= Math.floor(n / 2)) return img;

    // Based on the dimensions of our image, it will determine how many times we need to rotate each set of image values. 
        // Our goal in this solution is to target 4 image values - specifically the corners. If we can rotate those by 90 degrees, then shift over the vaclues of each corner's image value to the image value next to it, we can keep following this pattern until we have fully rotated each side of the image. 
        // Note that the helper variable below also checks to make sure how many layers deep into our image we are. 
        // The -1 subtraction is to account for the zero-th index value nature of our matrix. 
    let numOfRotationsNeededForCurrLayer = n - 1 - 2 * layer;

    // We will iterate as many times as the number of rotations needed for the current layer we're on. 
    for (let i = 0; i < numOfRotationsNeededForCurrLayer; i++) {
        // The 4 helper variables below gather the 4 corner values of our image. 
        let topLeftValue = img[layer][layer + i];
        let topRightValue = img[layer + i][n - 1 - layer];
        let bottomRightValue = img[n - 1 - layer][n - 1 - layer - i];
        let bottomLeftValue = img[n - 1 - layer - i][layer];

        // Once we have the values of our corners, we can shift everything over by 90 degrees without fear of overwriting any values. 
        // Moving clockwise, first we overwrite the top left corner value with the bottom left corner value. 
        img[layer][layer + i] = bottomLeftValue;

        // Then the top right with the top left. 
        img[layer + i][n - 1 - layer] = topLeftValue;

        // Then the bottom right with the top right. 
        img[n - 1 - layer][n - 1 - layer - i] = topRightValue;

        // Then the bottom left with the bottom right.  
        img[n - 1 - layer - i][layer] = bottomRightValue;
    }

    // Last, a recursive call to begin moving into the next inner layer
    rotateImageby90(img, layer + 1); 

    // After all the recursion-ing is done, we can return our rotated-in-place image. 
    return img;
}

// Notes to self: 
// corner coordinates:
    // Top L: 0, 0
    // Top R: 0, n - 1
    // Bot. R: n - 1, n - 1
    // Bot. L: n - 1, 0

// when rotating to the next set of corner values, below are the changes: 
    // TL: 0, 1 --> Top left moves Y coordinate over by 1
    // TR: 1, n - 1 --> Top right moves X coordinate over by 1
    // BR: n - 1, n - 2 --> Bottom right moves Y coordinate over by 1
    // BL: n - 2, n - 1 --> Bottom left moves X coordinate over by 1

let sampleImg = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]

let newImage = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
]

let otherSampleImg = [
    [6, 7],
    [10, 11]
]

console.log(rotateImageby90(sampleImg))
console.log(rotateImageby90(newImage))
console.log(rotateImageby90(otherSampleImg))