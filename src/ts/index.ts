const field: string = 'Hello TypeScript'
const srt: string = '1'
const srt2 = Number(srt)

interface OBJ {
    field: string
}

const wfm: OBJ = { field }

// eslint-disable-next-line no-console
console.log(wfm.field, srt2)

export default {}
