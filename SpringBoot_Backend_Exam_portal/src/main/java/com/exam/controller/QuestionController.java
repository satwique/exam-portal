package com.exam.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.Question;
import com.exam.entity.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins="http://localhost:4200")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService ;
	@Autowired
	private QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<Question> addQuestion(@RequestBody Question question){
		Question c=this.questionService.addQuestion(question);
		return ResponseEntity.ok(c);
	}
	
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") long quesId) {
		return this.questionService.getQuestion(quesId);
	}
	
	@PutMapping("/")
	public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") long qid){
		//Quiz q=new Quiz();
		//q.setQid(qid);
		//Set<Question> q1=this.questionService.getQuestionOfQuiz(q);
		//return ResponseEntity.ok(q1);
		
		Quiz q=this.quizService.getQuiz(qid);
		Set<Question> qes=q.getQuestion();
		List<Question> l=new ArrayList(qes);
		if(l.size()>Integer.parseInt(q.getNumberOfQuestions())) {
			l=l.subList(0, Integer.parseInt(q.getNumberOfQuestions()+1));
		}
		l.forEach((q1)->{
			q1.setAnswer("");
		});
		
		Collections.shuffle(l);
		return ResponseEntity.ok(l);
	}
	
	@GetMapping("/quiz/all/{qid}")
	public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("qid") long qid){
		Quiz q=new Quiz();
		q.setQid(qid);
		Set<Question> q1=this.questionService.getQuestionOfQuiz(q);
		return ResponseEntity.ok(q1);
		
		
	}
	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") long quesId) {
		this.questionService.deleteQuestion(quesId);
	}
	
	
	@PostMapping("/eval-quiz")
	public ResponseEntity<Map<String, Object>> evalQuiz(@RequestBody List<Question> questions){
		System.out.print(questions);
		double marksGot=0;
		int correctAnswers=0;
		int attempted=0;
		for(Question q:questions){
			
			Question question=this.questionService.get(q.getQuesId());
			if(question.getAnswer().trim().equals(q.getGivenAnswers())) {
				
				correctAnswers++;
				double marksSingle=Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				marksGot+=marksSingle;
			}
			if( q.getGivenAnswers()!=null) {
				attempted++;
				
			}
		}
		Map<String, Object> map=Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
		return ResponseEntity.ok(map);
	}
	

}
