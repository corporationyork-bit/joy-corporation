cd ~/joy-corporation
cat > patch.mjs <<'EOF'
import fs from 'fs';
const f = 'public/index.html';
let s = fs.readFileSync(f, 'utf8');
const a = s.indexOf('async function callGemini');
const b = s.indexOf('async function runDivisionAI');
if (a < 0 || b < 0) { console.log('GAGAL: fungsi tidak ditemukan'); process.exit(1); }
const fn = `async function callGemini(systemPrompt, userPrompt) {
  const response = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });
  const raw = await response.text();
  if (!response.ok) throw new Error("AI error " + response.status + ": " + raw.slice(0, 200));
  let text = "";
  try { text = JSON.parse(raw)?.choices?.[0]?.message?.content || ""; } catch { text = raw; }
  if (!text) throw new Error("AI tidak mengembalikan teks.");
  return text;
}

`;
s = s.slice(0, a) + fn + s.slice(b);
s = s.replace('const has = Boolean(getApiKey());', 'const has = true;');
fs.writeFileSync(f, s);
console.log('BERHASIL');
EOF
node patch.mjs
npm start
