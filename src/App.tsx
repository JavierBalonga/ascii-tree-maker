import { useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorageState } from '@/lib/use-local-storage-state';

import { CopyButton } from './components/copy-button';
import generateTree from './generate-tree';

function App() {
  const [value, setValue] = useLocalStorageState<string>('text', defaultText);
  const tree = useMemo(() => generateTree(value), [value]);

  return (
    <div className="flex min-h-svh flex-col items-center px-8">
      <div className="flex h-0 w-full max-w-7xl grow flex-col gap-8 py-8">
        <header>
          <h1 className="text-4xl">ASCII Tree Maker</h1>
        </header>
        <main className="flex h-0 grow flex-col gap-8">
          <p className="text-lg text-balance">
            Use this online ASCII Tree Maker to create a text tree for any text documentation. Just
            type or paste your text with indentation using "=" symbols, and the tool will generate a
            visual tree structure for you.
          </p>
          <div className="flex h-0 grow flex-col">
            <div className="grid h-0 grow grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="flex flex-col">
                <Textarea
                  className="h-0 grow font-mono"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <p className="text-foreground/30 overflow-hidden text-nowrap text-ellipsis">
                  Use "=" as indentation symbols.
                </p>
              </div>
              <div className="flex flex-col">
                <pre className="border-input dark:bg-input/30 relative flex field-sizing-content h-0 min-h-16 w-full grow overflow-auto rounded-md border bg-transparent px-3 py-2 font-mono text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm">
                  {tree}
                  <CopyButton className="absolute top-2 right-2" text={tree} />
                </pre>
                <p className="text-foreground/30 overflow-hidden text-nowrap text-ellipsis">
                  The output tree can be copied using the button on the top right corner.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

const defaultText = `/
= bin
= boot
== grub
=== fonts 
=== locale
= cdrom
= dev
== block
== bsg
== bus
=== usb
==== 001
==== 002`;
