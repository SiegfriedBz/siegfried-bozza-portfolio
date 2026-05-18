import type { FC } from "react";

export const Figure2SubmissionAgent: FC = () => {
  return (
    <svg
      className="diag-svg"
      role="img"
      aria-label="Flowchart: Submission agent — fetch IPFS manifest, run Exa plagiarism search, Gemini schema-constrained verdict, then branch to earlySlashPublication or pickReviewers."
      viewBox="0 0 700 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Figure 2 — Submission agent</title>
      <defs>
        <marker
          id="bioverify-f2-m"
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
        height="312"
        rx="12"
        className="band-teal"
      />
      <text x="38" y="33" className="band-label-teal">
        SUBMISSION AGENT (Inngest + LangGraph)
      </text>

      <g className="dn-teal">
        <rect x="38" y="42" width="140" height="60" rx="7" />
        <text x="108" y="62" textAnchor="middle" className="node-title">
          1. Fetch IPFS
        </text>
        <text x="108" y="79" textAnchor="middle" className="node-sub">
          retrieve manifest
        </text>
        <text x="108" y="92" textAnchor="middle" className="node-sub">
          by CID
        </text>
      </g>
      <line
        x1="178"
        y1="72"
        x2="200"
        y2="72"
        className="arr-line"
        stroke="#2dd4bf"
        markerEnd="url(#bioverify-f2-m)"
      />

      <g className="dn-teal">
        <rect x="202" y="42" width="140" height="60" rx="7" />
        <text x="272" y="62" textAnchor="middle" className="node-title">
          2. Exa plagiarism
        </text>
        <text x="272" y="82" textAnchor="middle" className="node-sub">
          semantic web search
        </text>
      </g>
      <line
        x1="342"
        y1="72"
        x2="364"
        y2="72"
        className="arr-line"
        stroke="#2dd4bf"
        markerEnd="url(#bioverify-f2-m)"
      />

      <g className="dn-teal">
        <rect x="366" y="42" width="140" height="60" rx="7" />
        <text x="436" y="62" textAnchor="middle" className="node-title">
          3. Gemini LLM
        </text>
        <text x="436" y="79" textAnchor="middle" className="node-sub">
          schema-constrained
        </text>
        <text x="436" y="92" textAnchor="middle" className="node-sub">
          verdict
        </text>
      </g>

      <path
        d="M 436 102 L 436 118 L 350 118 L 350 128"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f2-m)"
      />

      <g className="dn-gray">
        <rect x="270" y="128" width="160" height="60" rx="7" />
        <text x="350" y="148" textAnchor="middle" className="node-title">
          4. Decision
        </text>
        <text x="350" y="165" textAnchor="middle" className="node-sub">
          earlySlash or
        </text>
        <text x="350" y="178" textAnchor="middle" className="node-sub">
          pickReviewers
        </text>
      </g>

      <path
        d="M 350 188 L 350 208 L 135 208 L 135 246"
        fill="none"
        stroke="#e05c4b"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f2-m)"
      />
      <text
        x="236"
        y="202"
        textAnchor="middle"
        fill="#e05c4b"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        plagiarism
      </text>
      <g className="dn-coral">
        <rect x="40" y="246" width="190" height="34" rx="8" />
        <text x="135" y="266" textAnchor="middle" className="node-title">
          earlySlashPublication()
        </text>
      </g>

      <path
        d="M 350 188 L 350 208 L 565 208 L 565 246"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f2-m)"
      />
      <text
        x="462"
        y="202"
        textAnchor="middle"
        fill="#2dd4bf"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        clean
      </text>
      <g className="dn-green">
        <rect x="470" y="246" width="190" height="34" rx="8" />
        <text x="565" y="266" textAnchor="middle" className="node-title">
          pickReviewers()
        </text>
      </g>
    </svg>
  );
};
