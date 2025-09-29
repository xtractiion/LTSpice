const projectsData = {
  analog: [
    {
      id: "astable-multivibrator",
      title: "Astable Multivibrator",
      description: "A basic astable multivibrator using 555 timer IC for square wave generation.",
      category: "analog",
      tags: ["555 Timer", "Oscillator", "Square Wave"],
      thumbnail: "assets/images/projects/astable/thumb.png",
      googleDriveUrl: "https://drive.google.com/drive/folders/YOUR_ASTABLE_FOLDER_ID",
      images: [
        "assets/images/projects/astable/schematic.png",
        "assets/images/projects/astable/pcb.png",
        "assets/images/projects/astable/simulation.png",
        "assets/images/projects/astable/breadboard.png",
        "assets/images/projects/astable/output.png"
      ],
      waveforms: [
        {
          name: "Output Waveform",
          image: "assets/images/projects/astable/waveform1.png"
        },
        {
          name: "Timing Analysis",
          image: "assets/images/projects/astable/waveform2.png"
        }
      ],
      downloadFile: {
        name: "astable.asc",
        path: "assets/files/astable.asc",
        type: "asc"
      },
      calculations: "Frequency = 1.44/((R1+2*R2)*C1)\nDuty Cycle = (R1+R2)/(R1+2*R2) * 100%",
      difficulty: "Beginner"
    },
    {
      id: "op-amp-integrator",
      title: "Op-Amp Integrator",
      description: "Integrator circuit using LM741 op-amp for signal processing applications.",
      category: "analog",
      tags: ["Op-Amp", "Integrator", "Signal Processing"],
      thumbnail: "assets/images/projects/integrator/thumb.png",
      googleDriveUrl: "https://drive.google.com/drive/folders/YOUR_INTEGRATOR_FOLDER_ID",
      images: [
        "assets/images/projects/integrator/schematic.png",
        "assets/images/projects/integrator/analysis.png",
        "assets/images/projects/integrator/frequency.png"
      ],
      waveforms: [
        {
          name: "Input vs Output",
          image: "assets/images/projects/integrator/waveform1.png"
        }
      ],
      downloadFile: {
        name: "integrator.asc",
        path: "assets/files/integrator.asc",
        type: "asc"
      },
      calculations: "Vout = -1/(R*C) * ∫Vin dt",
      difficulty: "Intermediate"
    }
  ],
  digital: [
    {
      id: "counter-circuit",
      title: "4-Bit Binary Counter",
      description: "Synchronous 4-bit binary counter using JK flip-flops.",
      category: "digital",
      tags: ["Counter", "JK Flip-Flop", "Sequential Logic"],
      thumbnail: "assets/images/projects/counter/thumb.png",
      googleDriveUrl: "https://drive.google.com/drive/folders/YOUR_COUNTER_FOLDER_ID",
      images: [
        "assets/images/projects/counter/schematic.png",
        "assets/images/projects/counter/truth-table.png",
        "assets/images/projects/counter/timing.png"
      ],
      waveforms: [
        {
          name: "Clock and Outputs",
          image: "assets/images/projects/counter/waveform1.png"
        }
      ],
      downloadFile: {
        name: "counter.asc",
        path: "assets/files/counter.asc",
        type: "asc"
      },
      calculations: "Max Count = 2^n - 1 = 15\nClock Frequency = Input Freq / 16",
      difficulty: "Intermediate"
    },
    {
      id: "logic-gates",
      title: "Basic Logic Gates",
      description: "Implementation and analysis of basic logic gates using discrete components.",
      category: "digital",
      tags: ["Logic Gates", "Boolean Logic", "Discrete"],
      thumbnail: "assets/images/projects/logic/thumb.png",
      googleDriveUrl: "https://drive.google.com/drive/folders/YOUR_LOGIC_GATES_FOLDER_ID",
      images: [
        "assets/images/projects/logic/schematic.png",
        "assets/images/projects/logic/gates.png"
      ],
      waveforms: [
        {
          name: "Truth Table Verification",
          image: "assets/images/projects/logic/waveform1.png"
        }
      ],
      downloadFile: {
        name: "logic_gates.asc",
        path: "assets/files/logic_gates.asc",
        type: "asc"
      },
      calculations: "AND: Y = A·B\nOR: Y = A+B\nNOT: Y = Ā",
      difficulty: "Beginner"
    }
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
