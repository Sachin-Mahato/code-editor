import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FileTreeContextProvider from '../../../context/FileContext';
import "@testing-library/jest-dom";

describe('FileListItem (with real context)', () => {
    it("renders with a valid name prop", async () => {
        const { FileListItem } = await import('../../../components/fileTree/FileListItem');
        const name = "testFile.html";
        render(
            <FileTreeContextProvider>
                <FileListItem name={name} />
            </FileTreeContextProvider>
        );
        const button = screen.getByRole('button', { name: `Open file ${name}` });
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId(`file-list-item-${name}`)).toBeInTheDocument();
        expect(screen.getByTestId(`file-list-item-label-${name}`)).toHaveTextContent(name);
    });

    it("renders with an empty string as name prop", async () => {
        const { FileListItem } = await import('../../../components/fileTree/FileListItem');
        const name = "";
        render(
            <FileTreeContextProvider>
                <FileListItem name={name} />
            </FileTreeContextProvider>
        );
        const button = screen.getByRole('button', { name: /open file\s*$/i });
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId('file-list-item-')).toBeInTheDocument();
        expect(screen.getByTestId('file-list-item-label-')).toHaveTextContent(name);
    });
});

// Tests using the mocked context
describe('FileListItem (with mocked context)', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it("calls toggleFileActiveState on click", async () => {
        const toggleFileActiveState = vi.fn();

        vi.doMock('../../../hooks/useFileContext', () => ({
            __esModule: true,
            default: () => ({
                toggleFileActiveState,
            }),
        }));

        const { FileListItem: MockedFileListItem } = await import('../../../components/fileTree/FileListItem');

        const name = "testFile.html";
        render(<MockedFileListItem name={name} />);

        const button = screen.getByRole('button', { name: `Open file ${name}` });
        fireEvent.click(button);

        expect(toggleFileActiveState).toHaveBeenCalledTimes(1);
        expect(toggleFileActiveState).toHaveBeenCalledWith(expect.any(Object), name);
    });
});