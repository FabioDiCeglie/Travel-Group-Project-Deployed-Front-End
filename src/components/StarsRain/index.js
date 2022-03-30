import("./style.css");
export default function StarsRain() {
  var emoji = [
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
    "✨",
  ];
  return (
    <div>
      {emoji?.map((emo, i) => (
        <div key={i} className="emoji">
          {emo}
        </div>
      ))}
    </div>
  );
}
