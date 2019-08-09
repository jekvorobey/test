import Firebase from 'firebase/app';
import 'firebase/database';

export default function createAPI({ config, version }) {
    Firebase.initializeApp(config);
    return Firebase.database().ref(version);
}
