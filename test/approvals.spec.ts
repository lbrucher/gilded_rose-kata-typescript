import { Item, GildedRose } from '@/gilded-rose';

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * The test case "thirtyDays" is similar to the TextTest from the 'Java' version
 */

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('should thirtyDays', () => {
    process.argv = ["<node>", "<script", "30"];
    require('./golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  });
});
