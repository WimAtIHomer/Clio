interface RactiveConfig {
    el: string
    template: string
}

interface Ractive {
    (config : RactiveConfig): void
    parse(template: string): string
}

declare var Ractive: Ractive;