import { data } from "@/data/portfolio";

export default function SkillsSection() {
  return (
    <div className="p-6">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.skills.map((category) => (
          <div
            key={category.category}
            className="rounded-lg p-4"
            style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
          >
            <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-1">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium text-gray-700"
                  style={{
                    background: "white",
                    border: "1px solid #d0d0d0",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
