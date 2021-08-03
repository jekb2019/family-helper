import './App.css';
import { useEffect, useState } from 'react';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries'; // 이건 graphql/queries.js 파일에 정의되어 export되어있다
import 'semantic-ui-css/semantic.min.css'
import MainHeader from './components/headers/MainHeader';
import Lists from './components/Lists/Lists';
import { Container } from 'semantic-ui-react';
Amplify.configure(awsConfig); //set up AWS

function App() {

  const [lists, setLists] = useState([]);


  // DB에서 가져오는것은 시간이 걸림으로 async를 주자
  async function fetchList() {
    // graphQL에서 data를 가져온다
    const { data } = await API.graphql(graphqlOperation(listLists));
    // 가져온 뒤 setList로 변경한다
    setLists(data.listLists.items);
  }

  // only run after the initial render
  useEffect(() => {
    fetchList()
  }, []);

  return (
    // authenticated 되지 않은 사람들이 <AmplifyAuthenticator> 내부에 있는 것들에 접근할 수 없다.
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Container>
        <div className="App">
          <MainHeader/>
          <Lists lists={lists} />
        </div>
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
