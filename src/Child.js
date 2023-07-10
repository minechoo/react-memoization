import { memo } from 'react';

function Child() {
	console.log('child');
	return (
		<div>
			<h1>Child</h1>
		</div>
	);
}

export default memo(Child);

/*
메모이제이션
-특정값을 강제로 메모리에 할당해서 값을 재활용(속도가 빨라짐)
-메모이제이션을 많이 할 수록 메모리점유율을 강제로 늘려서 속도를 증가
- 자바스크립트 엔진은 garbage collection (안 쓰는 메모리를 정기적으로 제거해서 메모리 최적화)

부모 컴포턴트가 재호출되면 자식 컴포넌트는 변경되는 내용이 없음에도 불구하고 무조건 재호출(불필요한 함수 호출 발생) 

memo - 특정 컴포넌트 자체를 메모이제이션해서 부모컴포넌트가 재랜더링 되더라도 자식 컴포넌트를 매번 랜더링 하는것이 아닌 이전 랜더링된 결과값을 재활용(불필요한 재랜더링 방지)

hoc(high order component) 함수로 인수로 함수를 전달해서 새로운 함수를 전환하는 형태
*/
