import type { FC } from "react";

/** Figure 1 — Event pipeline (marker id scoped to avoid clashes with other SVGs on page) */
export const Figure1EventPipeline: FC = () => {
  return (
    <svg
      className="diag-svg"
      role="img"
      aria-label="Flowchart: BioVerifyV3 contract events flow through Alchemy Notify and a HMAC-verified Next.js webhook into Neon Postgres (read model) and Inngest (which wraps LangGraph agents for two specific events)."
      viewBox="0 0 700 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Figure 1 — Event pipeline</title>
      <defs>
        <marker
          id="bioverify-f1-m"
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

      <g className="dn-blue">
        <rect x="240" y="16" width="220" height="60" rx="8" />
        <text x="350" y="38" textAnchor="middle" className="node-title">
          BioVerifyV3
        </text>
        <text x="350" y="54" textAnchor="middle" className="node-sub">
          · writes
        </text>
        <text x="350" y="68" textAnchor="middle" className="node-sub">
          · emits granular events
        </text>
      </g>
      <line
        x1="350"
        y1="76"
        x2="350"
        y2="92"
        className="arr-line"
        stroke="#58a6ff"
        markerEnd="url(#bioverify-f1-m)"
      />

      <g className="dn-amber">
        <rect x="240" y="92" width="220" height="50" rx="8" />
        <text x="350" y="112" textAnchor="middle" className="node-title">
          Alchemy Notify
        </text>
        <text x="350" y="129" textAnchor="middle" className="node-sub">
          contract-scoped · signed webhook
        </text>
      </g>
      <line
        x1="350"
        y1="142"
        x2="350"
        y2="158"
        className="arr-line"
        stroke="#f0b429"
        markerEnd="url(#bioverify-f1-m)"
      />

      <g className="dn-amber">
        <rect x="240" y="158" width="220" height="50" rx="8" />
        <text x="350" y="178" textAnchor="middle" className="node-title">
          Next.js serverless handler
        </text>
        <text x="350" y="195" textAnchor="middle" className="node-sub">
          HMAC-SHA256 verify → decode → route
        </text>
      </g>

      <line
        x1="240"
        y1="183"
        x2="178"
        y2="183"
        className="arr-line"
        stroke="#f0b429"
        markerEnd="url(#bioverify-f1-m)"
      />
      <g className="dn-amber">
        <rect x="28" y="158" width="150" height="60" rx="8" />
        <text x="103" y="178" textAnchor="middle" className="node-title">
          Neon Postgres
        </text>
        <text x="103" y="194" textAnchor="middle" className="node-sub">
          · reads
        </text>
        <text x="103" y="208" textAnchor="middle" className="node-sub">
          · OCC on (block, logIndex)
        </text>
      </g>

      <line
        x1="460"
        y1="183"
        x2="530"
        y2="183"
        className="arr-line"
        stroke="#f0b429"
        strokeDasharray="4 2"
        markerEnd="url(#bioverify-f1-m)"
      />
      <rect
        x="532"
        y="158"
        width="150"
        height="60"
        rx="7"
        fill="#1e1535"
        stroke="#a78bfa"
        strokeWidth="0.8"
      />
      <text
        x="607"
        y="178"
        textAnchor="middle"
        className="node-title"
        fill="#a78bfa"
      >
        Inngest
      </text>
      <text
        x="607"
        y="194"
        textAnchor="middle"
        className="node-sub"
        fill="#a78bfa"
        style={{ opacity: 0.8 }}
      >
        · Durable execution
      </text>
      <text
        x="607"
        y="208"
        textAnchor="middle"
        className="node-sub"
        fill="#a78bfa"
        style={{ opacity: 0.8 }}
      >
        · wraps LangGraph agents
      </text>

      <rect
        x="480"
        y="224"
        width="196"
        height="48"
        rx="6"
        fill="#1e1535"
        stroke="#a78bfa"
        strokeWidth="0.5"
        strokeDasharray="3 2"
      />
      <text
        x="578"
        y="238"
        textAnchor="middle"
        fill="#a78bfa"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        triggered for 2 events only:
      </text>
      <text
        x="578"
        y="252"
        textAnchor="middle"
        fill="#a78bfa"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        · SubmitPublication
      </text>
      <text
        x="578"
        y="266"
        textAnchor="middle"
        fill="#a78bfa"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
      >
        · Agent_PickReviewers
      </text>
      <line x1="578" y1="224" x2="578" y2="218" className="leader-line" />

      <line
        x1="103"
        y1="218"
        x2="103"
        y2="232"
        className="arr-line"
        stroke="#3fb950"
        markerEnd="url(#bioverify-f1-m)"
      />
      <g className="dn-green">
        <rect x="28" y="232" width="150" height="52" rx="8" />
        <text x="103" y="250" textAnchor="middle" className="node-title">
          UI read model
        </text>
        <text x="103" y="266" textAnchor="middle" className="node-sub">
          · fast and rich queries
        </text>
        <text x="103" y="280" textAnchor="middle" className="node-sub">
          · no eth_call
        </text>
      </g>
    </svg>
  );
};
