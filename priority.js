
const processes = [
    { id: "P1", arrival: 0, burst: 4, priority: 3 },
    { id: "P2", arrival: 1, burst: 6, priority: 1 },
    { id: "P3", arrival: 2, burst: 7, priority: 2 },
    { id: "P4", arrival: 3, burst: 5, priority: 4 },
    { id: "P5", arrival: 4, burst: 5, priority: 5 },
    { id: "P6", arrival: 5, burst: 6, priority: 2 }
];
let gaint_chart = []



function priority(processes) {
    let remaining = [...processes]


    let current_time = 0;
    remaining.forEach((p) => {
        p.remaining_burst = p.burst
       
    });
    let results = [];
    remaining.sort((a, b) => a.priority - b.priority);

    while (remaining.length > 0) {
        let queue = [];
        for (let i = 0; i < remaining.length; i++) {
            if (remaining[i].arrival <= current_time) {
                queue.push(remaining[i].id);
            }
        }

        if (queue.length > 0) {
            const i = remaining.findIndex((p) => p.id === queue[0]);
            const process = remaining[i];



         

            current_time += 1;
            remaining[i].remaining_burst -= 1;
            gaint_chart.push(process.id)

         
            if (remaining[i].remaining_burst === 0) {
                remaining[i].turn_around = current_time - process.arrival;
                remaining[i].waiting = remaining[i].turn_around - process.burst;
                results.push(remaining[i]);
                remaining.splice(i, 1);
            }
            
        } else {

            current_time++;
        }
    }
    return results;
}


function display(result) {
    console.log("Process | Arrival Time | Burst Time | Priority | Turnaround Time | Waiting Time");
    console.log("---------------------------------------------------------------------------------------");
    result.forEach(r => {
        console.log(
            `${r.id.padEnd(8)}| ${String(r.arrival).padEnd(13)}| ${String(r.burst).padEnd(11)}| ${String(r.priority).padEnd(9)}| ${String(r.turn_around).padEnd(16)}| ${String(r.waiting).padEnd(12)}`
        );
    });
}


const results = priority(processes);
console.log(JSON.stringify(results));
display(results);
console.log("gaint chart -> [" + gaint_chart + "]");



