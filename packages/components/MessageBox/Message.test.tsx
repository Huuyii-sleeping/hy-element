import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import type { MessageBoxType } from "./types";
import MessageBox from "./methods";

export const rAF = async () => {
    return new Promise((res) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                res(null)
                await nextTick()
            })
        })
    })
}

describe('MessageBox Component', () => {
    it('render corrently', async () => {
        const props = {
            title: 'Test title',
            message: 'test message',
            showClose: true,
            closeOnclickModel: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            showConfimButton: true,
        }

        MessageBox(props)
        await rAF()
        const header = document.querySelector('.hy-message-box__header')
        const title = document.querySelector('.hy-message-box__title')
        const message = document.querySelector('.hy-message-box__message')

        expect(title).toBeTruthy();
        expect(header).toBeTruthy();
        expect(message).toBeTruthy();

        MessageBox.close();
    })

    // test submit result
    it('closes on close button click', async () => {
        const props = {
            title: 'test title',
            message: 'test message',
            showClose: true,
        }

        const doAction = vi.fn()
        MessageBox(props).catch((action: any) => doAction(action))
        await rAF()


        const closeBtn = document.querySelector(
            ".hy-message-box__header-btn"
        ) as HTMLButtonElement;
        closeBtn.click();

        await rAF();

        expect(doAction).toHaveBeenCalledWith("close")
    })

    // test submit cancel
    it('triggers cancel action on cancel button click', async () => {
        const props = {
            title: "Test Title",
            message: "Test Message",
            showConfirmButton: true,
            showCancelButton: true,
        }

        const doAction = vi.fn();
        MessageBox(props).catch((err: any) => doAction(err));
        await rAF();

        const cancelBtn = document.querySelector(
            ".hy-message-box__cancel-btn"
        ) as HTMLButtonElement;
        cancelBtn.click();

        await rAF();

        expect(doAction).toHaveBeenCalledWith("cancel");
    })

    // test 
    it("handles input in prompt mode", async () => {
        const props = {
            title: "Test Title",
            message: "Test Message",
            boxType: "prompt" as MessageBoxType,
            inputValue: 'Test Title',
            showInput: true,
        };

        const doAction = vi.fn();
        MessageBox(props).then((res: any) => doAction(res));
        await rAF();

        const input = document.querySelector("input") as HTMLInputElement;
        input.value = 'Test Input'
        input.dispatchEvent(new Event("input"));

        const confirmBtn = document.querySelector(
            ".hy-message-box__confirm-btn"
        ) as HTMLButtonElement;
        confirmBtn.click();

        await rAF();

        expect(doAction).toHaveBeenCalledWith({
            value: "Test Title",
            action: "confirm",
        });
    });
})