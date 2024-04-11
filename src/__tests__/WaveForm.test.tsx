import { render } from "@testing-library/react";
import React from "react";
import WaveFormCanvas from "../components/WaveFormCanvas/WaveFormCanvas";
import { vi } from "vitest";

describe("WaveForm 캔버스에 대한 테스트 코드를 작성한다.", () => {
  test("WaveFormCanvas가 렌더링 된다.", () => {
    const mockClickHandler = vi.fn();
    const fakeRef = React.createRef<HTMLCanvasElement>();

    const { container } = render(
      <WaveFormCanvas
        canvasRef={fakeRef}
        className="test-class"
        width={500}
        height={200}
        clickCanvasProgressBarHandler={mockClickHandler}
      />
    );

    const canvasElement = container.querySelector("canvas");
    expect(canvasElement).toBeInTheDocument();
  });
});
