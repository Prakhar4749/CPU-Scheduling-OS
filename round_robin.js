
const processes = [
  { id: "P1", arrival: 0, burst: 4 },
  { id: "P2", arrival: 10, burst: 6 },
  { id: "P3", arrival: 12, burst: 7 },
  { id: "P4", arrival: 1, burst: 5 },
  { id: "P5", arrival: 3, burst: 5 },
  { id: "P6", arrival: 4, burst: 6 }
];
let gaint_chart = []

const time_limit = 3;


function round_robin(processes, time_limit) {
  let remaining = [...processes]


  let current_time = 0;
  remaining.forEach((p) => {
    p.remaining_burst = p.burst
    
  });
  let queue = [];
  let results = [];

  while (remaining.length > 0) {
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].arrival <= current_time && queue.indexOf(remaining[i].id) == -1) {
        queue.push(remaining[i].id);
      }
    }



    if (queue.length > 0) {
      const i = remaining.findIndex((p) => p.id === queue[0]);
      const process = remaining[i];




      const execution_time = Math.min(time_limit, remaining[i].remaining_burst);
      current_time += execution_time;
      remaining[i].remaining_burst -= execution_time;


      if (remaining[i].remaining_burst === 0) {
        remaining[i].turn_around = current_time - process.arrival;
        remaining[i].waiting = remaining[i].turn_around - process.burst;
        results.push(remaining[i]);
        gaint_chart.push(process.id)
        remaining.splice(i, 1);
      }
      else {
        for (let i = 0; i < remaining.length; i++) {
          if (remaining[i].arrival <= current_time && queue.indexOf(remaining[i].id) == -1) {
            queue.push(remaining[i].id);
          }
        }
      }
      queue.shift();
    } else {

      current_time++;
    }
  }
  return results;
}
console.log(JSON.stringify(round_robin(processes, time_limit)));


function display(results) {
  console.log("Process | Arrival Time | Burst Time | Turnaround Time | Waiting Time");
  console.log("---------------------------------------------------------------");
  results.forEach(result => {
    console.log(
      `${result.id.padEnd(8)}| ${String(result.arrival).padEnd(13)}| ${String(result.burst).padEnd(11)}| ${String(result.turn_around).padEnd(16)}| ${String(result.waiting).padEnd(12)}`
    );
  });
}


const result = round_robin(processes, time_limit);


display(result);
console.log("gaint chart -> [" + gaint_chart + "]");
