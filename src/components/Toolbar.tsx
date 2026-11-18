import { useRef, useState } from 'react';
import { useStore } from '../store';
import { LABS } from '../labs/library';
import { EXAMPLES } from '../labs/examples';
import { KIDS_LABS } from '../labs/kids';

const USER_GUIDE_URL = 'https://github.com/zavada123/edu-network/blob/main/docs/USER_GUIDE.md';

type ExportAction =
  | 'exportJson'
  | 'exportConfigs'
  | 'exportContainerlab'
  | 'exportCompose'
  | 'exportSvg'
  | 'exportPng'
  | 'exportReport';

function ExportItem({
  label,
  hint,
  action,
  close,
}: {
  label: string;
  hint: string;
  action: ExportAction;
  close: (open: boolean) => void;
}) {
  const fn = useStore((s) => s[action]);
  return (
    <button
      className="labs-menu-item"
      onClick={() => {
        fn();
        close(false);
      }}
    >
      <span className="labs-menu-title">{label}</span>
      <span className="labs-menu-blurb">{hint}</span>
    </button>
  );
}

export function Toolbar() {
  const [labsOpen, setLabsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const loadBundledLab = useStore((s) => s.loadBundledLab);
  const loadExample = useStore((s) => s.loadExample);
  const loadKidsLab = useStore((s) => s.loadKidsLab);
  const kids = useStore((s) => s.mode === 'kids');
  const clock = useStore((s) => s.clock);
  const paused = useStore((s) => s.paused);
  const speed = useStore((s) => s.speed);
  const notice = useStore((s) => s.notice);
  const setPaused = useStore((s) => s.setPaused);
  const setSpeed = useStore((s) => s.setSpeed);
  const newTopology = useStore((s) => s.newTopology);
  const loadDemo = useStore((s) => s.loadDemo);
  const importJson = useStore((s) => s.importJson);
  const shareUrl = useStore((s) => s.shareUrl);
  const setNotice = useStore((s) => s.setNotice);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File | undefined) => {
    if (!f) return;
    const err = importJson(await f.text());
    if (err) setNotice(`Не вдалося відкрити файл: ${err}`);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <header className="toolbar">
      <div className="brand">
        <span className="brand-name">Мережева лабораторія</span>
      </div>

      <div className="toolbar-group">
        <button className="btn" onClick={() => newTopology()}>
          Нова схема
        </button>
        {!kids && (
          <button className="btn" onClick={() => loadDemo()}>
            Приклад
          </button>
        )}
        <div className="labs-menu-wrap">
          <button className="btn" onClick={() => setLabsOpen((v) => !v)}>
            Завдання ▾
          </button>
          {labsOpen && (
            <div className="labs-menu" onMouseLeave={() => setLabsOpen(false)}>
              {KIDS_LABS.map((l, i) => (
                <button
                  key={l.lab!.id}
                  className="labs-menu-item"
                  onClick={() => {
                    loadKidsLab(i);
                    setLabsOpen(false);
                  }}
                >
                  <span className="labs-menu-title">{l.lab!.title}</span>
                  <span className="labs-menu-blurb">{l.lab!.blurb}</span>
                </button>
              ))}
              {!kids && <div className="labs-menu-section">Лабораторні з терміналом (англ.)</div>}
              {!kids && LABS.map((l, i) => (
                <button
                  key={l.lab!.id}
                  className="labs-menu-item"
                  onClick={() => {
                    loadBundledLab(i);
                    setLabsOpen(false);
                  }}
                >
                  <span className="labs-menu-title">{l.lab!.title}</span>
                  <span className="labs-menu-blurb">{l.lab!.blurb}</span>
                </button>
              ))}
              {!kids && <div className="labs-menu-section">Приклади мереж</div>}
              {!kids && EXAMPLES.map((ex, i) => (
                <button
                  key={ex.title}
                  className="labs-menu-item"
                  onClick={() => {
                    loadExample(i);
                    setLabsOpen(false);
                  }}
                >
                  <span className="labs-menu-title">{ex.title}</span>
                  <span className="labs-menu-blurb">{ex.blurb}</span>
                </button>
              ))}
              <div className="labs-menu-note">Нове завдання замінить те, що зараз на полі.</div>
            </div>
          )}
        </div>
        {!kids && (
        <button className="btn" onClick={() => fileRef.current?.click()}>
          Відкрити
        </button>
        )}
        {!kids && (
        <div className="labs-menu-wrap">
          <button className="btn" onClick={() => setExportOpen((v) => !v)}>
            Зберегти ▾
          </button>
          {exportOpen && (
            <div className="labs-menu export-menu" onMouseLeave={() => setExportOpen(false)}>
              <ExportItem label="Схема (.json)" hint="зберегти й відкрити пізніше" action="exportJson" close={setExportOpen} />
              <ExportItem label="Налаштування (.zip)" hint="справжні setup.sh, nftables.conf, dnsmasq.conf" action="exportConfigs" close={setExportOpen} />
              <ExportItem label="containerlab (.clab.yml)" hint="запустити схему на справжніх контейнерах" action="exportContainerlab" close={setExportOpen} />
              <ExportItem label="docker-compose (.yml)" hint="L2 приблизно, див. примітку у файлі" action="exportCompose" close={setExportOpen} />
              <ExportItem label="Малюнок (.svg)" hint="схема для документації" action="exportSvg" close={setExportOpen} />
              <ExportItem label="Малюнок (.png)" hint="той самий малюнок, 2×" action="exportPng" close={setExportOpen} />
              <ExportItem label="Звіт (.html)" hint="документ для друку з таблицями й схемою" action="exportReport" close={setExportOpen} />
            </div>
          )}
        </div>
        )}
        {!kids && (
          <button className="btn" onClick={() => shareUrl()}>
            Посилання
          </button>
        )}
        {!kids && (
          <a className="btn" href={USER_GUIDE_URL} target="_blank" rel="noopener noreferrer">
            Довідка (англ.)
          </a>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>

      <div className="toolbar-group sim-controls">
        <button className="btn" onClick={() => setPaused(!paused)} title={paused ? 'Продовжити' : 'Пауза'}>
          {paused ? '▶ Пуск' : '⏸ Пауза'}
        </button>
        <select className="speed" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={0.25}>0.25×</option>
          <option value={0.5}>0.5×</option>
          <option value={1}>1×</option>
          <option value={2}>2×</option>
          <option value={4}>4×</option>
        </select>
        {!kids && <span className="clock">t = {(clock / 1000).toFixed(1)} с</span>}
      </div>

      {notice && <div className="notice">{notice}</div>}
    </header>
  );
}
