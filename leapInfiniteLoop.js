var controllerOptions = {};
let i = 0;
Leap.loop(controllerOptions, function(frame)
{
console.log(i);
i++;
}
);
