import { render, screen } from '@testing-library/react';
import { describe, it, expect, } from 'vitest';
import FileTreeContainer from '../../../components/fileTree/FileTreeContainer';
import "@testing-library/jest-dom";

describe("FileTreeContainer", () => {
    it("renders File Tree Provider and FileTreeLayout", () => {
        render(<FileTreeContainer />);
        expect(screen.getByTestId("file-tree-container")).toBeInTheDocument();
        expect(screen.getByTestId("file-tree-layout")).toBeInTheDocument();
    });

});