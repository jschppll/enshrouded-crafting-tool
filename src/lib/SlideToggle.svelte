<script lang="ts">
    let { label = "", value = $bindable(false) }: { label: string, value: boolean } = $props();

    let checked = $state(false);

    const uniqueID = Math.floor(Math.random() * 100)

    function handleClick(event: MouseEvent) {
        const target = event.target

        if (target instanceof HTMLElement)
        {
            const state = target.getAttribute('aria-checked')
            checked = state !== 'true';

            value = checked;
        }
    }
</script>

<div class="slideToggle">
    <span id={`switch-${uniqueID}`}>{label}</span>
    <button
        role="switch"
        aria-checked={checked}
        aria-labelledby={`switch-${uniqueID}`}
        onclick={(e) => handleClick(e)}>
    </button>
</div>

<style>
    .slideToggle {
        display: flex;
        align-items: center;

        button {
            width: 3em;
            height: 1.6em;
            position: relative;
            margin: 0 0 0 0.5em;
            background: var(--gray);
            border: none;
            border-radius: 1.5em;
        }

        button::before {
            content: '';
            position: absolute;
            width: 1.3em;
            height: 1.3em;
            background: #fff;
            top: 0.13em;
            right: 1.5em;
            transition: transform 0.3s;
            border-radius: 100%;
        }

        button[aria-checked='true']{
            background-color: var(--accent-color)
        }

        button[aria-checked='true']::before{
            transform: translateX(1.3em);
            transition: transform 0.3s;
        }

        button:focus {
            box-shadow: 0 0 8px var(--accent-color);
            border-radius: 1.5em;
        }
    }
</style>