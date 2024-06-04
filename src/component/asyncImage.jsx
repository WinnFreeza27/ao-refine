import { Grow } from 'transitions-kit'
import { AsyncImage } from 'loadable-image'

export default function ImageLoadable({src}) {
    return (
        <AsyncImage
            src={src}
            style={{ width: 100, height: 100}}
            loader={<div style={{ position: 'absolute', top: "100px", backgroundColor: 'red', width: '10%', height: '10%', borderRadius: '0.5rem' }}/>}
            Transition={Grow}
/>
    )
}
