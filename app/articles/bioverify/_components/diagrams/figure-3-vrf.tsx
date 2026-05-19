import type { FC } from "react";

export const Figure3Vrf: FC = () => {
  return (
    <svg
      className="diag-svg"
      role="img"
      aria-label="Flowchart: Chainlink VRF — agent calls pickReviewers, BioVerifyV3 requests random words, Chainlink returns words plus proof, contract verifies and emits Agent_PickReviewers."
      viewBox="0 0 700 260"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Figure 3 — Chainlink VRF</title>
      <defs>
        <marker
          id="bioverify-f3-m"
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

      <g className="dn-teal">
        <rect x="20" y="48" width="130" height="52" rx="8" />
        <text x="85" y="68" textAnchor="middle" className="node-title">
          Agent
        </text>
        <text x="85" y="85" textAnchor="middle" className="node-sub">
          pickReviewers()
        </text>
      </g>
      <line
        x1="150"
        y1="74"
        x2="164"
        y2="74"
        className="arr-line"
        stroke="#2dd4bf"
        markerEnd="url(#bioverify-f3-m)"
      />

      <g className="dn-blue">
        <rect x="166" y="48" width="168" height="52" rx="8" />
        <text x="250" y="68" textAnchor="middle" className="node-title">
          BioVerifyV3
        </text>
        <text x="250" y="85" textAnchor="middle" className="node-sub">
          requestRandomWords()
        </text>
      </g>
      <line
        x1="334"
        y1="74"
        x2="348"
        y2="74"
        className="arr-line"
        stroke="#58a6ff"
        markerEnd="url(#bioverify-f3-m)"
      />

      <rect
        x="350"
        y="22"
        width="230"
        height="78"
        rx="12"
        fill="#1a1000"
        stroke="#f0b429"
        strokeWidth="0.8"
        strokeDasharray="5 3"
      />
      <text
        x="465"
        y="44"
        textAnchor="middle"
        fill="#f0b429"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9px"
        letterSpacing="0.08em"
      >
        CHAINLINK VRF
      </text>
      <text
        x="465"
        y="64"
        textAnchor="middle"
        fill="#b0bac4"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="11.5px"
      >
        Random words
      </text>
      <text
        x="465"
        y="82"
        textAnchor="middle"
        fill="#b0bac4"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="11.5px"
      >
        + cryptographic proof
      </text>

      <path
        d="M 465 100 L 465 130 L 317 130 L 317 174"
        fill="none"
        stroke="#f0b429"
        strokeWidth="1.5"
        markerEnd="url(#bioverify-f3-m)"
      />

      <g className="dn-blue">
        <rect x="232" y="174" width="170" height="52" rx="8" />
        <text x="317" y="194" textAnchor="middle" className="node-title">
          BioVerifyV3
        </text>
        <text x="317" y="211" textAnchor="middle" className="node-sub">
          fulfillRandomWords()
        </text>
      </g>
      <line
        x1="402"
        y1="200"
        x2="418"
        y2="200"
        className="arr-line"
        stroke="#58a6ff"
        markerEnd="url(#bioverify-f3-m)"
      />

      <g className="dn-green">
        <rect x="420" y="174" width="260" height="52" rx="8" />
        <text x="550" y="204" textAnchor="middle" className="node-title">
          Agent_PickReviewers event→ pipeline
        </text>
      </g>
    </svg>
  );
};
