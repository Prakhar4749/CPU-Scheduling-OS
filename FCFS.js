const processes = [
    { id: "P1", arrival: 0, burst: 4 },
    { id: "P2", arrival: 10, burst: 6 },
    { id: "P3", arrival: 12, burst: 7 },
    { id: "P4", arrival: 1, burst: 5 },
    { id: "P5", arrival: 3, burst: 5 },
    { id: "P6", arrival: 4, burst: 6 },
  ];
  let gaint_chart = []
  
  
  function scheduling(processes) {
    
    processes.sort((a, b) =>  a.arrival - b.arrival);
  
    let current = 0; 
    processes.forEach((process) => {
     
      current = Math.max(current, process.arrival) + process.burst;
  
      
      process.turn_around = current - process.arrival;
      process.waitingTime = process.turn_around - process.burst;
      gaint_chart.push(process.id)
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
    processes.forEach((process) => {
      console.log(
        `| ${process.id}      | ${process.arrival.toString().padStart(
          12
        )} | ${process.burst.toString().padStart(10)} | ${process.turn_around
          .toString()
          .padStart(15)} | ${process.waitingTime.toString().padStart(12)} |`
      );
    });
  }

  display(processes);
  console.log("gaint chart ->" + gaint_chart);

  
  