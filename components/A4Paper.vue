<template>
    <div class="paper letter">
        <div class="receipt first">
            <slot />
        </div>
        <div class="receipt">
            <slot name="bottom" />
        </div>
    </div>
</template>
