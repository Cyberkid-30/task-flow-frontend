import React from "react";

export default function Textbox({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-primary">{label}</label>
      )}
      <textarea
        {...props}
        style={{ resize: "none" }}
        name="description"
        rows="5"
        placeholder="Enter task description"
        className="w-full border border-b-color bg-form text-primary rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground transition-all duration-300 placeholder:text-text-tertiary"
      ></textarea>
    </div>
  );
}
