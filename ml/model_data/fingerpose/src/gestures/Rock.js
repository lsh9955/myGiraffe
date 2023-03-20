import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe thumbs up gesture 👍
const rockDescription = new GestureDescription('rock');

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for(let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  rockDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rockDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
rockDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
rockDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
rockDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
rockDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);

export default rockDescription;