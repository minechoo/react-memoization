import { memo, useMemo } from 'react';
//props로 전달되는 값이 참조형 자료일때 참조링크값을 비교하는 것이아닌 참조되고 있는 원본 데이터가 같은지를 비교
import { isEqual } from 'lodash';

function Child(props) {
	console.log('child');

	const heavyWork = useMemo(() => {
		let num = 0;
		for (let i = 0; i < 5000000000; i++) {
			num++;
		}
		return num;
	}, []);

	return (
		<div>
			<h1>Child : {props.Counter}</h1>
			<button onClick={props.updateCounter}>update</button>
			{/* <h2>{heavyWork()}</h2> */}
			<h2>{heavyWork}</h2>
		</div>
	);
}

export default memo(Child, isEqual);

/*
  메모이제이션
  - 특정 값을 강제로 메모리에 할당해서 값을 재활용 (속도가 빨라짐)
  - 메모이제이션을 많이 할수록 메모리점유율을 강제로 늘려서 속도를 증가
  - 자바스크립트엔진은 garbage collection (안쓰는 메모리를 정기적으로 제거해서 메모리 최적화)
  - 메모이제이션된 요소는 가비지 컬렉션에서 제외됨

  부모 컴포넌트가 재호출되면 자식 컴포넌트는 변경되는 내용이 없음에도 불구하고 무조건 재호출 (불필요한 함수 호출 발생)

  memo - 특정 컴포넌트 자체를 메모이제이션해서 부모컴포넌트가 재랜더링 되더라도 자식 컴포넌트를 매번 재랜더링하는 것이 아닌 이전 렌더링된 결과값을 재활용 (불필요한 재랜더링 방지)

  hoc(high order compoent) :함수로 인수로 함수를 전달해서 새로운 함수를 반환하는 형태

  - 자식컴포넌트가 memo로 메모이제이션되었다 하더라도 prop값이 전달되면 memoization이 풀림
  - 자식 요소에 props전달되지 않는 값이 부모 컴포넌트에서 변경되면 그때는 자식컴포넌트의 메모이제이션이 유지됨

  -만약 prop으로 참조형 자료가 전달되면 부모에서 해당값을 변경하지 않더라도 부모컴포넌트가 재랜더링되면 자식컴포넌트의 메모이제이션이 풀리면서 재호출 발생

  - 위와 같은 현상 발생이유 - 참조형 자료는 메모리에 해당 값 자체가 할당되는 것이 아닌 참조 링크가 할당되기 때문에 부모컴포넌트가 재호출일어나면 참조링크가 계속 변경되고 자식 컴포넌트 입장에서는 매번 다른 값이 전달되므로 메모이제이션을 해제
  - 해결방법 : lodash의 isEqual을 이용해서 참조링크가 아닌 참조되는 원본 데이터값을 비교해서 해결

  만약 함수(참조형 자료)가 props로 전달되면 부모컴포넌트에서 해당함수가 변경되는게 아님에도 불구하고 자식 컴포넌트는 메모이제이션 안 됨 isEqual 처리불가

   - useCallback : 부모컴포넌트 단에서 props전달되는 함수자체를  memoization처리
  - useCallback사용시 함수를 통채로 메모이제이션하기 때문에 함수내부에서 특정 State값을 변경한다면 해당 State를 의존성배열에 등록
  - 해당 State가 변경될때만 임시로 메모이제이션을 풀어주도록 설정

  - useMemo : 특정함수의 리턴값 자체를 메모이제이션
  - useCallback 사용예1: 자식으로 함수를 전달할때 해당 함수를 메모이제이션처리해서 자식 컴포넌트의 재호출 자체를 막고 싶을때
  - useCallback 사용예2: props로 함수를 전달하지 않더라도 특정 컴포넌트가 재호출될때마다 굳이 똑같은 함수를 매번 해석하지 않아야될때
  - useMemo 사용예: 자식 컴포넌트의 재호출이 불가피할때 자식 컴포넌트에서 무겁게 연산되는 특정값을 메모이제이션 처리해서 자식 컴포넌트가 재호출되더라도 무겁지않게 재호출하기 위함
*/
