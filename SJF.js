const processes = [
  { id: "P1", arrival: 0, burst: 4 },
  { id: "P2", arrival: 10, burst: 6 },
  { id: "P3", arrival: 12, burst: 7 },
  { id: "P4", arrival: 1, burst: 9 },
  { id: "P5", arrival: 3, burst: 5 },
  { id: "P6", arrival: 4, burst: 6 },
];

let gaint_chart = []


function scheduling(processes) {
  
  let current_time = 0; 
  
  let remaining = [...processes];
  let results = [];
  while(remaining.length > 0){
    let available = remaining.filter((p)=> p.arrival<=current_time) ;
    available.sort((a, b) =>  a.burst - b.burst);

    if(available.length > 0){

      let current_p = available[0];
      const i = remaining.indexOf(current_p);
      remaining.splice(i, 1);

        current_time = Math.max(current_time, current_p.arrival) + current_p.burst;
        
        current_p.turn_around = current_time - current_p.arrival;
        current_p.waiting = current_p.turn_around - current_p.burst;

        results.push(current_p);
        gaint_chart.push(current_p.id);
    }
    else current_time++; 
  }
  return results;
}
const results = scheduling(processes);
console.log(JSON.stringify(results));

function display(processes) {
  console.log(
    "| Process | Arrival Time | Burst Time | Turnaround Time | Waiting Time |"
  );
  console.log(
    "|---------|--------------|------------|-----------------|--------------|"
  );
  processes.forEach((process) => {
    console.log(
      `| ${process.id}      | ${process.arrival.toString().padStart(
        12
      )} | ${process.burst.toString().padStart(10)} | ${process.turn_around
        .toString()
        .padStart(15)} | ${process.waiting.toString().padStart(12)} |`
    );
  });
}

display(results);
console.log("gaint chart -> [" + gaint_chart + "]");


  
  