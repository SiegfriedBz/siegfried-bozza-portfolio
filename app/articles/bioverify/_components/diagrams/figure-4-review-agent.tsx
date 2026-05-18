import type { FC } from "react";

export const Figure4ReviewAgent: FC = () => {
  return (
    <svg
      className="diag-svg"
      role="img"
      aria-label="Flowchart: Review agent — LangGraph rehydrates from checkpointer, pauses for HITL EIP-712 signatures, peer consensus or senior tie-break, then publishPublication or slashPublication."
      viewBox="0 0 700 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Figure 4 — Review agent</title>
      <defs>
        <marker
          id="bioverify-f4-m"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M2 1L8 5L2 9"
            fill="none"
            stroke="context-stroke"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      <rect
        x="20"
        y="14"
        width="660"
        height="388"
        rx="12"
        className="band-green"
      />
      <text x="38" y="34" className="band-label-green">
        REVIEW AGENT (Inngest + LangGraph — HITL)
      </text>

      <g className="dn-teal">
        <rect x="240" y="44" width="220" height="46" rx="8" />
        <text x="350" y="62" textAnchor="middle" className="node-title">
          LangGraph rehydrates state
        </text>
        <text x="350" y="79" textAnchor="middle" className="node-sub">
          from Neon Postgres checkpointer
        </text>
      </g>
      <line
        x1="350"
        y1="90"
        x2="350"
        y2="112"
        className="arr-line"
        stroke="#3fb950"
        markerEnd="url(#bioverify-f4-m)"
      />

      <rect
        x="130"
        y="112"
        width="440"
        height="62"
        rx="10"
        fill="#1a0800"
        stroke="#e05c4b"
        strokeWidth="0.8"
        strokeDasharray="5 3"
      />
      <text
        x="350"
        y="133"
        textAnchor="middle"
        fill="#e05c4b"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="13px"
        fontWeight="500"
      >
        Human-in-the-loop pause
      </text>
      <text
        x="350"
        y="152"
        textAnchor="middle"
        fill="#e05c4b"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8px"
      >
        LangGraph interrupt() — Inngest step exits
      </text>
      <text
        x="350"
        y="164"
        textAnchor="middle"
        fill="#e05c4b"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8px"
      >
        {`Resume via Command({ resume }) when reviewer signs EIP-712 (may take days)`}
      </text>

      <line
        x1="350"
        y1="174"
        x2="350"
        y2="188"
        className="arr-line"
        stroke="#3fb950"
        markerEnd="url(#bioverify-f4-m)"
      />

      <g className="dn-gray">
        <rect x="240" y="188" width="220" height="46" rx="8" />
        <text x="350" y="206" textAnchor="middle" className="node-title">
          Peer reviewers agree?
        </text>
        <text x="350" y="223" textAnchor="middle" className="node-sub">
          consensus or conflict
        </text>
      </g>

      <line
        x1="240"
        y1="211"
        x2="160"
        y2="211"
        className="arr-line"
        stroke="#f0b429"
        markerEnd="url(#bioverify-f4-m)"
      />
      <text
        x="196"
        y="206"
        textAnchor="middle"
        fill="#f0b429"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        conflict
      </text>
      <g className="dn-amber">
        <rect x="36" y="188" width="122" height="46" rx="8" />
        <text x="97" y="206" textAnchor="middle" className="node-title">
          Senior reviewer
        </text>
        <text x="97" y="223" textAnchor="middle" className="node-sub">
          breaks tie → binding
        </text>
      </g>
      <line
        x1="97"
        y1="234"
        x2="97"
        y2="290"
        fill="none"
        stroke="#f0b429"
        strokeWidth="1.5"
      />
      <line
        x1="97"
        y1="290"
        x2="240"
        y2="290"
        fill="none"
        stroke="#f0b429"
        strokeWidth="1.5"
      />

      <line
        x1="350"
        y1="234"
        x2="350"
        y2="268"
        className="arr-line"
        stroke="#3fb950"
        markerEnd="url(#bioverify-f4-m)"
      />
      <text
        x="350"
        y="264"
        textAnchor="middle"
        fill="#3fb950"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        consensus
      </text>
      <g className="dn-gray">
        <rect x="240" y="270" width="220" height="46" rx="8" />
        <text x="350" y="290" textAnchor="middle" className="node-title">
          Binding verdict
        </text>
        <text x="350" y="306" textAnchor="middle" className="node-sub">
          pass or fail
        </text>
      </g>

      <path
        d="M 350 316 L 350 332 L 130 332 L 130 358"
        fill="none"
        stroke="#e05c4b"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f4-m)"
      />
      <text
        x="184"
        y="337"
        textAnchor="middle"
        fill="#e05c4b"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        fail
      </text>
      <g className="dn-coral">
        <rect x="54" y="358" width="154" height="38" rx="8" />
        <text x="131" y="380" textAnchor="middle" className="node-title">
          slashPublication()
        </text>
      </g>

      <path
        d="M 350 316 L 350 332 L 570 332 L 570 358"
        fill="none"
        stroke="#3fb950"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f4-m)"
      />
      <text
        x="516"
        y="337"
        textAnchor="middle"
        fill="#3fb950"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        pass
      </text>
      <g className="dn-green">
        <rect x="492" y="358" width="154" height="38" rx="8" />
        <text x="569" y="380" textAnchor="middle" className="node-title">
          publishPublication()
        </text>
      </g>
    </svg>
  );
};
