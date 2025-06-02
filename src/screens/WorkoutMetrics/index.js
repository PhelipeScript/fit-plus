import { useState, useMemo, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { ChartContainer, ChartTitle, Container, ExerciseCount, ExerciseGroup, ExerciseInfo, ExerciseItem, ExerciseName, ExerciseStats, ExerciseWeight, Header, HeaderIcon, HeaderSubtitle, HeaderTitle, MuscleGroupDistributionPieChart, Spacer, StatsRow, TabButton, TabButtonText, TabContent, TabsContainer, TabsHeader, TitleContainer, WeeklyChart } from './styles';
import { useWorkouts } from '../../hooks/useWorkouts';
import { getWorkoutSessions } from '../../services/firestoreService';
import { StatCard } from '../../components/cards/StatCard';
import { Barbell, ClockCountdown, Heartbeat } from 'phosphor-react-native';

export function WorkoutMetrics() {
  const [selectedTab, setSelectedTab] = useState('general');
  const { currentWorkout } = useWorkouts()
  const [sessions, setSessions] = useState(/** @type {WorkoutSessionProps[]} */([]))

  const metrics = useMemo(() => {
    const finishedSessions = sessions.filter(session => session.status === 'finished');
    
    const totalSessions = finishedSessions.length;
    const totalDurationMinutes = finishedSessions.reduce((acc, session) => 
      acc + session.duration.hours * 60 + session.duration.minutes, 0
    );

    const avgDurationMinutes = totalSessions > 0 ? Math.round(totalDurationMinutes / totalSessions) : 0;
    
    const totalExercises = finishedSessions.reduce((acc, session) => 
      acc + session.exercises.length, 0
    );

    const muscleGroupData = {};
    finishedSessions.forEach(session => {
      session.exercises.forEach(exercise => {
        muscleGroupData[exercise.muscleGroup] = (muscleGroupData[exercise.muscleGroup] || 0) + 1;
      });
    });

    const muscleGroupPieData = Object.entries(muscleGroupData).map(([group, count], index) => ({
      name: group,
      population: count,
      color: `hsl(${index * 45}, 70%, 60%)`,
      legendFontColor: '#6b7280',
      legendFontSize: 12,
    }));

    const sessionsPerDay = Array(7).fill(0);

    sessions.forEach(session => {
      const date = new Date(session.startedAt); 
      const day = date.getDay();
      sessionsPerDay[day]++;
    });

    const weeklyData = {
      labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      datasets: [{
        data: sessionsPerDay,
      }]
    };

    const countMap = new Map();

    for (const session of sessions) {
      const exercises = session.exercises || [];

      for (const exercise of exercises) {
        if (exercise.done) {
          const key = exercise.id;

          if (!countMap.has(key)) {
            countMap.set(key, {
              id: exercise.id,
              name: exercise.name,
              muscleGroup: exercise.muscleGroup,
              weight: exercise.weight,
              count: 1,
            });
          } else {
            countMap.get(key).count += 1;
          }
        }
      }
    }

    /** @type {{ id: string, name: string, muscleGroup: string, weight: number, count: number }[]} */
    const exercisesRanking = Array.from(countMap.values()).sort((a, b) => b.count - a.count)

    return {
      totalSessions,
      avgDurationMinutes,
      totalExercises,
      muscleGroupPieData,
      weeklyData,
      exercisesRanking
    };
  }, [sessions]);

  async function getSessions() {
    try {
      const sessions = await getWorkoutSessions(currentWorkout.id)
      setSessions(sessions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentWorkout) {
      getSessions()
    }
  }, [currentWorkout])

  return (
    <Container>
      <ScrollView>
        <Header>
          <TitleContainer>
            <HeaderIcon />
            <HeaderTitle>Estatísticas</HeaderTitle>
          </TitleContainer>
          <HeaderSubtitle>Acompanhe seu progresso nos treinos</HeaderSubtitle>
        </Header>

        <TabsContainer>
          <TabsHeader>
            <TabButton 
              isSelected={selectedTab === 'general'} 
              onPress={() => setSelectedTab('general')}
            >
              <TabButtonText isSelected={selectedTab === 'general'}>Geral</TabButtonText>
            </TabButton>
            <TabButton
              isSelected={selectedTab === 'exercises'} 
              onPress={() => setSelectedTab('exercises')}
            >
              <TabButtonText isSelected={selectedTab === 'exercises'}>Exercícios</TabButtonText>
            </TabButton>
          </TabsHeader>

          <TabContent>
            {selectedTab === 'general' && (
              <>
                <StatsRow>
                  <StatCard
                    title="Sessões" 
                    value={metrics.totalSessions} 
                    icon={Heartbeat}
                    color="#10b981"
                  />
                  <StatCard 
                    title="Duração Média" 
                    value={metrics.avgDurationMinutes} 
                    unit="min"
                    icon={ClockCountdown}
                    color="#f59e0b"
                  />
                </StatsRow>
                
                <StatsRow>
                  <StatCard 
                    title="Exercícios" 
                    value={metrics.totalExercises} 
                    icon={Barbell}
                    color="#8b5cf6"
                  />
                </StatsRow>

                <ChartContainer>
                  <ChartTitle>Atividade Semanal</ChartTitle>
                  <WeeklyChart data={metrics.weeklyData}  />
                </ChartContainer>
              </>
            )}

            {selectedTab === 'exercises' && (
              <>
                <ChartContainer>
                  <ChartTitle>Distribuição por Grupo Muscular</ChartTitle>
                  {metrics.muscleGroupPieData.length > 0 ? (
                    <MuscleGroupDistributionPieChart
                      data={metrics.muscleGroupPieData}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                    />
                  ) : (
                    <ChartTitle style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
                      Nenhum dado disponível
                    </ChartTitle>
                  )}
                </ChartContainer>

                <ChartContainer>
                  <ChartTitle>Exercícios Mais Realizados</ChartTitle>
                  {metrics.exercisesRanking.length > 0 ? metrics.exercisesRanking.slice(0, 5).map((exercise) => (
                    <ExerciseItem key={exercise.id}>
                      <ExerciseInfo>
                        <ExerciseName>
                          {exercise.name || 'Exercício'}
                        </ExerciseName>
                        <ExerciseGroup>
                          {exercise.muscleGroup || 'Grupo Muscular'}
                        </ExerciseGroup>
                      </ExerciseInfo>
                      <ExerciseStats>
                        <ExerciseCount>{exercise.count}x</ExerciseCount>
                        <ExerciseWeight>{exercise.weight || 0}kg</ExerciseWeight>
                      </ExerciseStats>
                    </ExerciseItem>
                  )) : (
                    <ChartTitle style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
                      Nenhum dado disponível
                    </ChartTitle>
                  )}
                </ChartContainer>
              </>
            )}
          </TabContent>
        </TabsContainer>

      </ScrollView>
    </Container>
  );
};
