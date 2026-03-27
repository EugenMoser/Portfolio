"use client";

import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

export default function AboutDialog({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center"
        style={{
          width: 360,
          background: "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Titlebar */}
        <div
          className="relative flex w-full items-center justify-center"
          style={{
            height: 28,
            background: "linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute left-3 flex h-3 w-3 items-center justify-center rounded-full"
            style={{ background: "#ff5f57", border: "1px solid #e0443e" }}
          />
          <span className="text-[12px] font-semibold text-gray-600">
            About This Mac
          </span>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col items-center gap-3 px-8 py-6">
          {/* OS Icon */}
          <div className="mb-1 text-6xl">🖥️</div>

          <div className="text-center">
            <p className="text-[18px] font-bold text-gray-800">
              Portfolio OS X
            </p>
            <p className="text-[12px] text-gray-500">Version 10.4.11 (Tiger)</p>
          </div>

          {/* Specs */}
          <div
            className="mt-1 w-full rounded-lg p-4"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <table className="w-full text-[12px]">
              <tbody>
                {[
                  ["Processor", "Motivation™ Core, 3.2 GHz"],
                  ["Memory", "∞ GB Kaffee"],
                  ["Startup Disk", "brain.local"],
                  ["Graphics", "Radeon Pro Ehrgeiz 42b GB"],
                  ["Serial Number", "EUGEN-MOSER-2026"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="w-1/2 py-0.5 pr-4 text-right text-gray-500">
                      {label}:
                    </td>
                    <td className="font-medium text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-[10px] leading-relaxed text-gray-400">
            © 2026 Eugen Moser. Alle Rechte vorbehalten.
            <br />
            Dieses Portfolio enthält keine echten Mac-Geheimnisse.
          </p>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="mt-1 rounded px-8 py-1.5 text-[13px] font-medium text-white"
            style={{
              background: "linear-gradient(180deg, #7ab0e8 0%, #4a7fc1 100%)",
              border: "1px solid #3a6fa1",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}
