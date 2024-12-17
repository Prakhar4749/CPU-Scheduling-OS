const processes = [
    { id: "P1", arrival: 0, burst: 4 },
    { id: "P2", arrival: 10, burst: 6 },
    { id: "P3", arrival: 12, burst: 7 },
    { id: "P4", arrival: 1, burst: 5 },
    { id: "P5", arrival: 3, burst: 5 },
    { id: "P6", arrival: 4, burst: 6 },
  ];
  let gaint_chart = [];
  
  
  function scheduling(p) {
    
    processes.sort((a, b) =>  a.arrival - b.arrival);
  
    let current_time = 0; 
    processes.forEach((p) => {
     
      current_time = Math.max(current_time, p.arrival) + p.burst;
      p.turn_around = current_time - p.arrival;
      p.waiting = p.turn_around - p.burst;
      gaint_chart.push(p.id)
    });
    
  
    return processes;
  }
  console.log(JSON.stringify(scheduling(processes)));

  function display(processes) {
    console.log(
      "| Process | Arrival Time | Burst Time | Turnaround Time | Waiting Time |"
    );
    console.log(
      "|---------|--------------|------------|-----------------|--------------|"
    );
    processes.forEach((p) => {
      console.log(
        `| ${p.id}      | ${p.arrival.toString().padStart(
          12
        )} | ${p.burst.toString().padStart(10)} | ${p.turn_around.toString()
          .padStart(15)} | ${p.waiting.toString().padStart(12)} |`
      );
    });
  }

  display(processes);
  console.log("gaint chart -> [" + gaint_chart + "]");

  
  